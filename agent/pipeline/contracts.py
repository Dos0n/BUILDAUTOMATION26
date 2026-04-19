"""
Stage contracts — defines what each node requires as input and produces as output.

Usage:
    ready, missing = STAGE_CONTRACTS[StageEnum.DESIGN].is_ready(state)
    if not ready:
        raise ValueError(f"DESIGN not ready, missing: {missing}")

    # Or use the convenience wrapper:
    validate_state_for_stage(StageEnum.DESIGN, state)  # raises on failure
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Tuple

from pipeline.state import JobStatus, PipelineState, StageEnum


@dataclass
class StageContract:
    """Declares the preconditions and postconditions for a single pipeline stage."""

    stage: StageEnum
    required_fields: List[str]
    output_fields: List[str]
    pre_status: JobStatus
    post_status: JobStatus

    def is_ready(self, state: PipelineState) -> Tuple[bool, List[str]]:
        """
        Check whether the state satisfies this stage's preconditions.

        Returns:
            (True, [])                  — ready to run
            (False, ["missing_field"])  — not ready, list of what's missing

        Field specs support equality checks using "=" syntax:
            "approved=True"  checks that state.approved is True
        All other specs check that getattr(state, name) is not None.
        """
        missing: List[str] = []

        for field_spec in self.required_fields:
            if "=" in field_spec:
                attr_name, expected_raw = field_spec.split("=", 1)
                expected: object
                if expected_raw == "True":
                    expected = True
                elif expected_raw == "False":
                    expected = False
                else:
                    expected = expected_raw

                actual = getattr(state, attr_name, None)
                if actual != expected:
                    missing.append(field_spec)
            else:
                value = getattr(state, field_spec, None)
                if value is None:
                    missing.append(field_spec)

        return len(missing) == 0, missing


# ---------------------------------------------------------------------------
# Contract registry
# ---------------------------------------------------------------------------

STAGE_CONTRACTS: Dict[StageEnum, StageContract] = {
    StageEnum.INTAKE: StageContract(
        stage=StageEnum.INTAKE,
        required_fields=["raw_form_payload", "org_id"],
        output_fields=["intake_output"],
        pre_status=JobStatus.PENDING,
        post_status=JobStatus.RUNNING,
    ),
    StageEnum.DESIGN: StageContract(
        stage=StageEnum.DESIGN,
        required_fields=["intake_output"],
        output_fields=["design_output"],
        pre_status=JobStatus.RUNNING,
        post_status=JobStatus.RUNNING,
    ),
    StageEnum.CODE_GENERATION: StageContract(
        stage=StageEnum.CODE_GENERATION,
        required_fields=["design_output"],
        output_fields=["code_generation_output"],
        pre_status=JobStatus.RUNNING,
        post_status=JobStatus.RUNNING,
    ),
    StageEnum.CONTENT: StageContract(
        stage=StageEnum.CONTENT,
        required_fields=["design_output", "intake_output"],
        output_fields=["content_output"],
        pre_status=JobStatus.RUNNING,
        post_status=JobStatus.RUNNING,
    ),
    StageEnum.SEO: StageContract(
        stage=StageEnum.SEO,
        required_fields=["content_output", "code_generation_output"],
        output_fields=["seo_output"],
        pre_status=JobStatus.RUNNING,
        post_status=JobStatus.RUNNING,
    ),
    StageEnum.APPROVAL_GATE: StageContract(
        stage=StageEnum.APPROVAL_GATE,
        required_fields=["seo_output", "content_output", "code_generation_output"],
        output_fields=["approval_gate_output"],
        pre_status=JobStatus.RUNNING,
        post_status=JobStatus.AWAITING_REVIEW,
    ),
    StageEnum.DEPLOYMENT: StageContract(
        stage=StageEnum.DEPLOYMENT,
        # "approved=True" is a value-equality check, not just a presence check
        required_fields=["approval_gate_output", "approved=True"],
        output_fields=["deployment_output"],
        pre_status=JobStatus.APPROVED,
        post_status=JobStatus.COMPLETED,
    ),
}


# ---------------------------------------------------------------------------
# Convenience wrapper
# ---------------------------------------------------------------------------


def validate_state_for_stage(stage: StageEnum, state: PipelineState) -> None:
    """
    Raises ValueError if state does not satisfy the contract for `stage`.

    Example:
        validate_state_for_stage(StageEnum.DESIGN, state)
    """
    contract = STAGE_CONTRACTS[stage]
    ready, missing = contract.is_ready(state)
    if not ready:
        raise ValueError(
            f"Stage {stage.value} preconditions not met. "
            f"Missing or invalid fields: {missing}"
        )
