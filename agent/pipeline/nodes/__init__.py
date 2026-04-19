"""
Node implementations live here — one module per stage.

Naming convention:
    nodes/intake.py          → def run_intake(state: PipelineState) -> dict
    nodes/design.py          → def run_design(state: PipelineState) -> dict
    nodes/code_generation.py → def run_code_generation(state: PipelineState) -> dict
    nodes/content.py         → def run_content(state: PipelineState) -> dict
    nodes/seo.py             → def run_seo(state: PipelineState) -> dict
    nodes/approval_gate.py   → def run_approval_gate(state: PipelineState) -> dict
    nodes/deployment.py      → def run_deployment(state: PipelineState) -> dict

Each node function must:
  1. Call validate_state_for_stage(StageEnum.X, state) at the top.
  2. Do its work (LLM calls, code generation, etc.).
  3. Return ONLY {"its_output_field": OutputModel(...)}.
     Never return the full state or modify other fields.

Example skeleton:

    from pipeline.state import PipelineState, StageEnum, MyOutput
    from pipeline.contracts import validate_state_for_stage
    from pipeline.config import get_node_config

    def run_my_stage(state: PipelineState) -> dict:
        validate_state_for_stage(StageEnum.MY_STAGE, state)
        config = get_node_config("MY_STAGE")
        # ... do work ...
        return {"my_stage_output": MyOutput(...)}

See contracts.py for the required/output fields per stage.
See config.py for model IDs and budget limits.
"""
