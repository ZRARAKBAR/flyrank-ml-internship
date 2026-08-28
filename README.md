 # Content Refresh Prioritization — FlyRank ML Internship Capstone

## What it does and for whom

This project ranks webpages by "decline risk" so a content or SEO team with
limited review time knows which pages to check first. It's built for content
teams managing large sites who can't manually review every page.

It does not predict Google's ranking algorithm and does not automatically
publish, edit, or delete content. It produces a prioritized list for a human
reviewer.

## Setup a stranger could follow

1. Clone the repo:

git clone https://github.com/ZRARAKBAR/flyrank-ml-internship
cd flyrank-ml-internship

2. Install dependencies:

pip install pandas numpy scikit-learn matplotlib

3. Place the dataset `content_refresh_anonymized.csv` in the expected path
   (`/content/content_refresh_anonymized.csv` if running in Google Colab, or
   update `DATA_PATH` in the notebook to your local path).
4. Open `work/notebooks/capstone.ipynb` in Jupyter or Google Colab.
5. Run all cells top to bottom (Runtime → Run all).

## Usage example

Running the notebook end to end produces:
- A ranked action queue: `work/outputs/capstone_ranked_action_queue.csv`
- A metrics receipt: `work/outputs/capstone_metrics_receipt.json`
- Feature importance and confusion matrix CSVs in `work/outputs/`
- Charts saved to `work/figures/`

Each row in the ranked queue includes a `decline_risk_score`, an `action_tier`
(Priority review / Review / Monitor / Lower priority), and a human-readable
`reason_codes` field (e.g. `HIGH_DECLINE_RISK|LOW_CTR`).

## Architecture (simple sketch)

Raw CSV (30,000 pages, 44 columns)
↓
Leakage-safe feature prep (drop trend_direction, trend_pct, IDs, 30-day fields)
↓
Grouped train/test split by client_id (25 train clients / 7 test clients)
↓
Rule-based baseline | Random Forest (200 trees)
↓
Evaluation on same held-out clients
↓
Final model trained on all data → decline-risk scores
↓
Action tiers + reason codes → ranked action queue (CSV export)


## Evaluation results (from a fresh notebook run)

| Metric    | Rule-based baseline | Random Forest |
|-----------|---------------------|----------------|
| Accuracy  | 48.9%                | 57.2%          |
| Precision | 0.0                  | 0.577          |
| Recall    | 0.0                  | 0.613          |
| F1        | 0.0                  | 0.594          |

Declining-class base rate in the dataset: 54.21%.
Validation: grouped by client (no client appears in both train and test).

## Limitations

- This is observational historical data, not a controlled experiment — the
  model does not prove causation.
- A high decline-risk score does not guarantee a page will keep declining.
- Refreshing a flagged page is not guaranteed to improve its search
  performance.
- The model does not reveal or prove Google's ranking algorithm.
- Results should be described using careful language: observed, measured,
  directional, decision-support — never "causes," "guarantees," or "proves
  a ranking factor."
- The model should never be used to auto-publish, auto-delete, or auto-edit
  content. It is a prioritization aid for human review only.

## AI use disclosure

I built this project's structure, code drafting, notebook skeleton, and
video/README scripting with the help of Claude (Anthropic). I personally
verified all evaluation numbers against fresh notebook reruns, checked the
leakage-exclusion logic myself, wrote the interpretation and limitations
sections in my own words, and confirmed the grouped-validation split
behaves correctly before including any result in this report.

## Demo Video

Watch the 3–5 minute live demo here: https://youtu.be/CoyKxLNQiPI
