// ─── Project Data ────────────────────────────────────────────────────────────
// Static project data for the Projects Showcase section.
// Sourced from the content migration checklist in plan.md.

export type ProjectCategory = "ml" | "stats";

// ─── Rich Detail Content Types ──────────────────────────────────────────────

/** A narrative section on the project detail page */
export interface ProjectSection {
  id: string;
  title: string;
  content: string;
}

/** A key metric/stat displayed in the HUD metrics panel */
export interface KeyMetric {
  label: string;
  value: string;
}

/** An embedded interactive visualization (e.g. Tableau Public dashboard) */
export interface EmbedVisualization {
  /** Display title for the embed */
  title: string;
  /** Embed-ready URL (e.g. Tableau Public /views/ URL with embed params) */
  url: string;
}

/** Full detail content for the project detail page */
export interface ProjectDetail {
  /** Narrative sections (Problem → Approach → Results, etc.) */
  sections: ProjectSection[];
  /** Key stats shown in a metrics panel */
  keyMetrics: KeyMetric[];
  /** Embedded interactive visualizations (optional) */
  embeds?: EmbedVisualization[];
  /** Team members (optional) */
  team?: string[];
  /** Academic course or context (optional) */
  course?: string;
  /** Semester / timeframe (optional) */
  timeline?: string;
}

// ─── Core Project Interface ─────────────────────────────────────────────────

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  /** Label for the liveDemo button (defaults to "View Notebook") */
  liveDemoLabel?: string;
  achievement?: string;
  featured: boolean;
  /** Rich detail content for the project detail page (populated per-project) */
  detail?: ProjectDetail;
}

/** Category metadata for filters and display */
export interface CategoryMeta {
  id: ProjectCategory | "all";
  label: string;
  shortLabel: string;
  accentColor: "cyan" | "green" | "amber" | "red";
}

export const categoryMeta: CategoryMeta[] = [
  { id: "all", label: "ALL PROJECTS", shortLabel: "ALL", accentColor: "cyan" },
  {
    id: "ml",
    label: "MACHINE LEARNING",
    shortLabel: "ML / AI",
    accentColor: "green",
  },
  {
    id: "stats",
    label: "STATISTICS",
    shortLabel: "STATS",
    accentColor: "red",
  },
];

/** Accent color for each project category */
export const categoryAccentMap: Record<
  ProjectCategory,
  "cyan" | "green" | "amber" | "red"
> = {
  ml: "green",
  stats: "red",
};

export const projects: Project[] = [
  // ─── ML / AI (High Priority) ───────────────────────────────────────────────
  {
    slug: "knn-recommender-birds",
    title: "kNN RECOMMENDER SYSTEM",
    subtitle: "Avian Species Classification",
    category: "ml",
    tags: [
      "kNN",
      "Recommender Systems",
      "Classification",
      "Hyperparameter Tuning",
      "HPC",
    ],
    description:
      "Built a k-nearest neighbors recommender system for bird species identification, featuring custom decay functions, soft-zero weighting, and multi-dimensional hyperparameter optimization. Achieved 1st place in class-wide Kaggle competition.",
    longDescription:
      "Developed a comprehensive kNN-based recommender system for avian species classification using eBird citizen science data spanning 85+ species with extreme class imbalance. The system incorporated Manhattan distance, exponential decay weighting, novel soft-zero weighting for missing values, log-transformation normalization, and a multi-pass 3D hyperparameter grid search — achieving a final MAE 25.3% below the recommended threshold.",
    techStack: [
      "R",
      "kNN",
      "Manhattan Distance",
      "Exponential Decay",
      "Log Normalization",
      "Parallel Computing",
      "Plotly",
      "ggplot2",
    ],
    image: "/projects/knn-birds.png",
    github:
      "https://github.com/steadows/steadows.github.io/blob/main/kNN_Recommender_System_Birds.html",
    liveDemo:
      "https://steadows.github.io/kNN_Recommender_System_Birds.html",
    achievement: "1st Place",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "Grand Valley's Machine Learning course (CIS 678) challenged students to identify underrepresented bird species in data collected across the United States from eBird, a citizen science platform where birders record their sightings. The dataset includes over 85 species with extreme class imbalance — counts ranging from 300 for rare species to over 160,000 for abundant ones like the Common Myna. The objective: build a recommender system that predicts missing bird species from observation checklists, evaluated by Mean Absolute Error (MAE) on a class-wide Kaggle leaderboard.",
        },
        {
          id: "exploratory-analysis",
          title: "EXPLORATORY ANALYSIS",
          content:
            "Initial analysis revealed severe variability across species counts. Quintile analysis showed that Q5 species exhibited the largest standard deviation, while Q1 had a tightly clustered, narrow range. Over 80% of the dataset consisted of zero values, confirming high sparsity — a critical factor in choosing Manhattan distance as the primary distance metric, given its robustness to sparse, high-dimensional data. This sparsity analysis also motivated the development of a custom soft-zero weighting scheme later in the project.",
        },
        {
          id: "approach",
          title: "APPROACH",
          content:
            "The team implemented a k-Nearest Neighbors algorithm built from scratch in R with several custom extensions:\n\n**Distance Metric Selection** — Manhattan distance was chosen over Euclidean and Cosine alternatives after initial testing showed it outperformed both, likely due to its robustness to outliers and suitability for high-dimensional sparse data.\n\n**Decay Functions** — Exponential decay (w = e^(-d/σ)) and triangular decay (w = max(0, 1-d/r)) were implemented to weight closer neighbors more heavily. Exponential decay consistently outperformed triangular, providing smoother weight transitions.\n\n**Soft-Zero Weighting** — A novel contribution: a conditional scalar that down-weights zero-valued features in test columns during distance calculation. This prevents missing observations from artificially inflating distances, allowing the algorithm to focus on meaningful non-zero co-occurrences.\n\n**Log Normalization** — Log-transformation of the data compressed the distance distribution, preventing high-count species from dominating calculations. This yielded an 18.5% improvement in MAE over non-normalized data.\n\n**HPC Parallel Processing** — Leveraged the doParallel package across multiple CPU cores, reducing runtime from ~10 minutes to ~4 minutes per iteration.",
        },
        {
          id: "hyperparameter-tuning",
          title: "HYPERPARAMETER TUNING",
          content:
            "Hyperparameter tuning proceeded through multiple passes of increasing resolution, visualized with interactive 3D scatter plots (Plotly):\n\n**Pass 1** — Broad search: σ ∈ [5, 50] (step 5), scalar ∈ [0.1, 1.0] (step 0.1). Best result: σ=10, scalar=0.6, Kaggle MAE = 0.0447.\n\n**Pass 2** — Focused search: σ ∈ [5, 12] (step 0.25), scalar ∈ [0.15, 0.75] (step 0.05). Best result: σ=9, scalar=0.4, MAE = 0.0444.\n\n**Pass 3** — High resolution: σ ∈ [7, 9.75] (step 0.05), scalar ∈ [0.3, 0.5] (step 0.01). Revealed interesting trough structures at σ ≈ 9 and σ ≈ 7.75.\n\n**Pass 4 (Normalized)** — After log-transformation with k=17: σ ∈ [0.5, 5] and scalar ∈ [0.1, 0.8], over 2,000+ combinations. Optimal: σ=1.5, scalar=0.25, MAE = 0.0362.\n\n**Final Grid Search** — Added k ∈ [3, 71] as a third dimension. Animated 3D plots showed that increasing k further improved results. Final submission: MAE = 0.0357.\n\nTo enable this scale of testing, the team pre-computed a global distance matrix and implemented an 80/20 internal cross-validation split, allowing hundreds of MAE calculations in minutes without hitting Kaggle's submission limits.",
        },
        {
          id: "results",
          title: "RESULTS",
          content:
            "The final model achieved an MAE of 0.0357 — placing 25.3% below the recommended threshold and earning 1st place in the class-wide Kaggle competition. The progression tells the story of systematic optimization:\n\n• Baseline (unweighted, k=19): MAE ≈ 0.049\n• + Exponential decay (σ=10): MAE = 0.046\n• + Soft-zero weighting (scalar=0.6): MAE = 0.0447\n• + Granular tuning (σ=9, scalar=0.4): MAE = 0.0444\n• + Log normalization (σ=1.5, scalar=0.25, k=17): MAE = 0.0362 (18.5% improvement)\n• + Full grid search (k optimized): MAE = 0.0357 (final, 1st place)",
        },
        {
          id: "future-considerations",
          title: "FUTURE WORK",
          content:
            "Several extensions were identified for further optimization: K-means clustering to engineer features capturing bird co-occurrence patterns; PCA for dimensionality reduction prior to clustering; and model stacking to combine kNN with clustering-derived features. Although the team began exploring this direction, the substantial gains achieved through decay weighting, soft-zero innovation, and normalization led to prioritizing those efforts for the competition deadline.",
        },
      ],
      keyMetrics: [
        { label: "FINAL MAE", value: "0.0357" },
        { label: "VS. THRESHOLD", value: "-25.3%" },
        { label: "SPECIES COUNT", value: "85+" },
        { label: "HYPERPARAMS TESTED", value: "2,000+" },
        { label: "MAE IMPROVEMENT", value: "27.2%" },
        { label: "COMPETITION RANK", value: "1st Place" },
      ],
      team: ["Steve Meadows", "Lauryn Davis", "Brooke Walters"],
      course: "CIS 678 — Machine Learning",
      timeline: "Fall 2024",
    },
  },
  {
    slug: "neural-network-cite",
    title: "NEURAL NETWORK CITE",
    subtitle: "ADT Protein Prediction",
    category: "ml",
    tags: ["Neural Networks", "Deep Learning", "Bioinformatics", "ADAM Optimizer"],
    description:
      "Custom-built feedforward neural network predicting Antibody-Derived Tag (ADT) protein expression from RNA sequencing data. Achieved 0.858 Pearson Correlation and 1st place.",
    longDescription:
      "Harnessed deep learning techniques to predict Antibody-Derived Tag (ADT) expression profiles from RNA sequencing data. The model predicts expression of 25 ADT proteins by capturing complex, non-linear relationships between RNA and protein expression. A fully connected four-layer feedforward neural network, built from scratch in R using matrix algebra, drives the approach — featuring custom activation functions (Swish, ReLU, Softplus), ADAM optimization, dropout regularization, mini-batching, batch normalization, and Bayesian-optimized hyperparameters. Performance was benchmarked against a baseline multiple linear regression model (0.802 Pearson), with the neural network achieving a 0.858 Pearson Correlation.",
    techStack: ["R", "Matrix Algebra", "Neural Networks", "ADAM", "Bayesian Optimization", "PCA", "Plotly"],
    image: "/projects/nn-cite.png",
    github: "https://github.com/steadows/steadows.github.io/blob/main/NeuralNetCITE.html",
    liveDemo: "https://steadows.github.io/NeuralNetCITE.html",
    achievement: "1st Place",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "Grand Valley's Machine Learning course (CIS 678) challenged students to predict Antibody-Derived Tag (ADT) protein expression from RNA sequencing data — a core problem in computational biology where direct protein measurement is expensive but RNA is readily available. The training dataset contained 4,000 cell observations across 639 RNA gene expression features, with the goal of predicting expression levels for 25 ADT surface proteins. Model performance was evaluated by Pearson Correlation on a held-out test set of 1,000 cells, scored through a class-wide Kaggle competition.\n\nThe problem is fundamentally one of capturing complex, non-linear relationships between gene expression and protein abundance — relationships that traditional linear methods can approximate but not fully exploit. This motivated the team to build a custom feedforward neural network from scratch in R using matrix algebra, progressively layering in modern deep learning techniques to push beyond the baseline.",
        },
        {
          id: "exploratory-analysis",
          title: "EXPLORATORY ANALYSIS",
          content:
            "Principal Component Analysis on the 639 RNA features revealed that PC1 alone explains ~64% of the total variance, with PC2 contributing only 3.4%. This extreme concentration suggests that many RNA features share common expression patterns, with a dominant latent structure driving the data.\n\nThe dense clustering observed in the PCA scatter plot confirmed this shared structure, while the steep variance dropoff implied that dimensionality reduction could compress the feature space without significant information loss. However, given the strong results achieved through network tuning alone, the team ultimately did not pursue PCA-based feature reduction — the neural network proved capable of learning its own effective internal representations from the raw 639 features.",
        },
        {
          id: "approach",
          title: "APPROACH",
          content:
            "The project followed a deliberate progression from traditional statistics to deep learning, using each stage to establish baselines and build understanding.\n\n**Baseline: Multiple Linear Regression** — The initial approach implemented OLS regression via matrix algebra (solving B̂ = (X'X)⁻¹X'Y) to predict all 25 ADT proteins simultaneously. This baseline achieved a 0.802 Pearson Correlation — a strong starting point that validated the relationship between RNA and protein expression, but one that could not capture the non-linear dynamics inherent in the data.\n\n**Custom Neural Network (From Scratch)** — Rather than importing a framework, the team built a fully connected feedforward neural network from the ground up in R using matrix algebra. This included hand-coded implementations of forward propagation, backpropagation, and gradient descent. The function-oriented codebase was later refactored into an object-oriented paradigm using R's R6 class system for cleaner modularity.\n\n**Key implementations built from scratch:**\n• Custom activation functions (Swish, ReLU, Softplus, Sigmoid) with hand-derived gradients\n• ADAM optimizer with bias-corrected first and second moment estimates\n• Dropout regularization with inverted scaling\n• Mini-batch gradient descent with configurable batch sizes\n• L2 regularization with weight decay\n• Gradient clipping to prevent exploding gradients\n• Composite early stopping criteria combining loss improvement and gradient norm stability\n\n**Torch Integration** — With a deep understanding of the mechanics, the team transitioned to R's Torch library (analogous to PyTorch) to leverage GPU-accelerated training, built-in batch normalization, and streamlined optimizer APIs — enabling the scale of experimentation needed for systematic hyperparameter tuning.",
        },
        {
          id: "architecture",
          title: "ARCHITECTURE",
          content:
            "The team tested 11 network architectures ranging from shallow single-hidden-layer designs (639→128→25) to deep six-hidden-layer configurations (639→1024→512→256→128→64→32→25), evaluated across two learning rates using a custom composite score that weighted R², Pearson correlation, cosine similarity, validation loss, and the generalization gap.\n\nA key insight emerged: **deeper is not always better.** While the deepest networks occasionally produced the highest individual scores, they exhibited large generalization gaps between training and validation loss — a hallmark of overfitting. The moderately sized architectures, particularly **639→512→256→128→25** (four layers) and **639→512→256→128→64→25** (five layers), consistently dominated across metrics.\n\nThe final architecture selected was the four-layer **639→512→256→128→25** network with ReLU activation across all hidden layers. This design balanced capacity (enough neurons to capture complex RNA-protein relationships) with generalizability (avoiding the noise memorization seen in deeper configurations).",
        },
        {
          id: "hyperparameter-tuning",
          title: "HYPERPARAMETER TUNING",
          content:
            "Hyperparameter optimization followed a systematic, research-driven schedule — tuning one dimension at a time, carrying forward the best settings, and visualizing results at every stage with interactive Plotly plots and heatmaps.\n\n**Learning Rate** — Tested across a logarithmic range. Learning rates of 0.01 and 0.001 demonstrated the strongest performance; smaller rates prolonged training without meaningful gains.\n\n**Dropout** — Exhaustive grid search across all 11 architectures with dropout rates from 0 to 0.50 in 0.05 increments, at both learning rates. Heatmap analysis revealed that mid-range dropout (0.20–0.40) benefited moderately sized networks, while shallow networks were highly sensitive to low rates and deep networks degraded sharply at high rates. Dropout lifted validation Pearson by 0.02–0.05 across the best architectures.\n\n**Batch Size** — Seven batch sizes (32, 48, 64, 82, 120, 140, 180) were tested across the top architectures and dropout configurations. The best result — 0.872 Pearson — was achieved with the 512→256→128 architecture at LR=0.001, dropout=0.30, batch size=48.\n\n**Activation Functions** — Compared ReLU, Sigmoid, Softplus, and Swish across layers. ReLU performed most consistently and was adopted as the primary activation.\n\n**Normalization** — Batch normalization outperformed layer normalization across all tracked metrics and was retained for subsequent experiments.\n\n**L2 Regularization** — Testing across a range from 0 to 1e-2 showed that while L2 reduced the generalization gap, it came at the cost of significantly degraded R² and Pearson scores. The team opted to rely on dropout as the primary regularizer.\n\n**ADAM Tuning** — Default β₁=0.9 and β₂=0.999 proved near-optimal. Slight adjustments to β₂ yielded marginal improvements insufficient to justify changing defaults.\n\n**Bayesian Optimization** — The ParBayesianOptimization package automated a 200-iteration search across learning rate (0.0001–0.01), dropout (0–0.5), batch size (32–256), and architecture. The Gaussian process identified the global optimum at iteration 51: LR=0.0013, dropout=0.19, batch size=140, architecture 639→512→256→128→25. Crucially, the Bayesian analysis confirmed that the shallower network more consistently achieved low loss — validating the team's manual tuning conclusions.",
        },
        {
          id: "results",
          title: "RESULTS",
          content:
            "The final model achieved a **0.858 Pearson Correlation** — a 7% improvement over the baseline MLR model and enough to earn **1st place** in the class-wide Kaggle competition. The progression from baseline to final model illustrates the cumulative impact of each optimization:\n\n• Baseline MLR (matrix algebra OLS): Pearson = 0.802\n• Custom neural network (no regularization): Pearson ≈ 0.84\n• + Dropout regularization: Pearson = 0.869\n• + Batch size tuning: Pearson = 0.872\n• + Batch normalization + ADAM: Pearson = 0.858 (Kaggle, best generalization)\n\nAn important finding was that the highest validation Pearson (~0.872) did not always translate to the best Kaggle score. The team discovered that **minimizing the generalization gap** between training and validation loss was a stronger predictor of Kaggle performance than maximizing any single validation metric. This insight shifted the optimization strategy toward configurations that balanced accuracy with generalizability.\n\nThe Bayesian optimization confirmed that the shallower 639→512→256→128→25 architecture consistently outperformed the deeper variant in loss distribution, even though the deeper network occasionally produced individual peak scores. This validated the principle that model simplicity, when paired with careful tuning, outperforms raw capacity.",
        },
        {
          id: "future-considerations",
          title: "FUTURE WORK",
          content:
            "Several directions were identified for further improvement. PCA-based dimensionality reduction could compress the 639 RNA features into a lower-dimensional space before feeding into the network, potentially reducing noise and training time. The Bayesian optimization's getLocalOptimums() function could identify multiple promising hyperparameter configurations for ensemble learning — combining the strengths of several well-tuned models rather than relying on a single global optimum.\n\nThe composite scoring function used during architecture evaluation could be refined by assigning greater weight to the training-validation loss gap, which proved to be the strongest predictor of generalization performance. Additionally, more sophisticated cross-validation strategies (such as k-fold) could replace the fixed 90/10 split to provide more robust performance estimates across the hyperparameter search.",
        },
      ],
      keyMetrics: [
        { label: "PEARSON CORRELATION", value: "0.858" },
        { label: "VS. BASELINE (MLR)", value: "+7.0%" },
        { label: "ADT PROTEINS", value: "25" },
        { label: "RNA FEATURES", value: "639" },
        { label: "ARCHITECTURES TESTED", value: "11" },
        { label: "COMPETITION RANK", value: "1st Place" },
      ],
      team: ["Steve Meadows", "Lauryn Davis", "Brooke Walters"],
      course: "CIS 678 — Machine Learning",
      timeline: "Fall 2024",
    },
  },
  {
    slug: "cross-modal-vae",
    title: "CROSS-MODAL VAE",
    subtitle: "Biological Prediction",
    category: "ml",
    tags: ["VAE", "Generative Models", "Cross-Modal", "Bioinformatics", "Adversarial Training"],
    description:
      "Built a cross-modal Variational Autoencoder predicting ADT protein expression from RNA sequencing data without paired samples, using adversarial latent space alignment. Achieved 0.75 Pearson Correlation and 2nd place.",
    longDescription:
      "Developed a cross-modal Variational Autoencoder to predict Antibody-Derived Tag (ADT) protein expression from RNA sequencing data — a challenge compounded by the absence of co-occurring samples across modalities. The architecture features separate RNA and ADT encoders/decoders unified by a shared latent space with reparameterization, adversarial discriminators with gradient reversal for modality-invariant representations, and multi-objective Bayesian optimization via Meta's Ax platform. Training proceeded in three phases: autoencoder reconstruction, cross-modal translation, and adversarial refinement with up to four discriminators. Achieved a 0.75 Pearson Correlation on the Kaggle leaderboard and earned 2nd place in the class-wide competition.",
    techStack: [
      "Python",
      "PyTorch Lightning",
      "TensorBoard",
      "Ax (BoTorch)",
      "UMAP",
      "R",
      "Shiny",
      "Plotly",
    ],
    image: "/projects/cross-modal-vae.png",
    github: "https://github.com/steadows",
    liveDemo: "https://ldavis9997.shinyapps.io/Biological_VAE/",
    achievement: "2nd Place",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "Grand Valley's Machine Learning course (CIS 678) challenged students to build a variational autoencoder capable of predicting multimodal single-cell sequencing data — specifically linking RNA gene expression profiles to ADT (Antibody-Derived Tag) protein expression. Derived from dissociated tissue samples like blood, these single-cell modalities produce matrices capturing gene expression (10,000 RNA features) and surface protein abundance (25 ADT features). The core challenge: **the RNA and ADT samples are not paired** — they come from independent measurements, meaning the model must learn the underlying biological relationships between modalities without ever seeing matched observations.\n\nPerformance was evaluated by Pearson Correlation between predicted and actual ADT expression on a held-out test set of 5,000 cells, scored through a class-wide Kaggle competition. Anything below 0.75 was considered indistinguishable from noise given the inherent variability in single-cell data.",
        },
        {
          id: "exploratory-analysis",
          title: "EXPLORATORY ANALYSIS",
          content:
            "Initial analysis revealed extreme sparsity across both modalities. The RNA training data contained over 45.6 million zero entries, while ADT had 829 zeros across its 25 features. Histograms of non-zero values highlighted a key distributional divergence: the RNA distribution exhibited a relatively smooth log-normal decay, while ADT showed a sharper peak and steeper decline — indicating a more concentrated expression profile across fewer features.\n\nThis divergence in distributional shape and scale underscored why a shared latent space must not only capture the core biological signal across modalities but also account for modality-specific sparsity patterns. The zero-inflation in both datasets reinforced the need for an architecture capable of learning robust, denoised representations rather than simply memorizing sparse input patterns.",
        },
        {
          id: "architecture",
          title: "ARCHITECTURE",
          content:
            "The team developed a fully modular, object-oriented framework in **Python using PyTorch Lightning**, opting for structured Python scripts over notebook-style development for maintainability and scalability.\n\nThe architecture implements a dual-branch variational autoencoder with six core components:\n\n• **RNAEncoder** (10,000 → 1,024 → 512 → 64): Compresses high-dimensional gene expression into a modality-specific embedding\n• **ADTEncoder** (25 → 64 → 32 → 64): Maps the smaller protein feature space into the same embedding dimensionality\n• **SharedEncoder** (64 → 1,024 → 512 → 256 → 128 → 128): Maps modality-specific embeddings into a unified latent space, outputting mean (μ) and variance (σ²) for reparameterization\n• **SharedDecoder**: Mirrors the shared encoder, reconstructing from the latent space back to modality-specific embeddings\n• **RNADecoder** and **ADTDecoder**: Reconstruct the original feature spaces from decoded embeddings\n\nReparameterization occurs in the shared latent space (z = μ + σ · ε), enabling gradient flow through the stochastic sampling step. Batch normalization, layer normalization, and dropout are applied selectively throughout the network. Kaiming initialization is used for all linear layers, and Gaussian noise is injected into inputs during training for a denoising effect.\n\n**TensorBoard** served as the primary experiment tracking platform, providing real-time visualization of training metrics, latent space embeddings via PCA and UMAP projections, and parallel coordinates plots for hyperparameter comparison.",
        },
        {
          id: "training-strategy",
          title: "TRAINING STRATEGY",
          content:
            "Training proceeded in three deliberate phases, each building on the prior checkpoint:\n\n**Phase 1 — Autoencoder Reconstruction:** Each modality (RNA and ADT) was trained to reconstruct itself through the shared latent space, minimizing MSE reconstruction loss plus a KL divergence penalty: L = MSE(x, x̂) + β · KL(q(z|x) ‖ p(z)). The KL weight (β) was managed through **cyclical logistic annealing** using an open-source Annealer library, preventing latent space collapse by alternating between reconstruction focus and regularization. Integration score (negative mean Euclidean distance between RNA and ADT latent embeddings) and silhouette score were tracked alongside reconstruction metrics to monitor cross-modal alignment.\n\n**Phase 2 — Cross-Modal Translation:** Loading the best autoencoder checkpoint, the model was fine-tuned for cross-modal prediction — RNA→ADT and ADT→RNA translation. The same architecture was used, with the encoder for one modality feeding into the decoder for the other. This phase achieved the team's best Kaggle score of **0.75 Pearson Correlation**.\n\n**Phase 3 — Adversarial Refinement:** To push beyond the cross-modal plateau, the team introduced adversarial training with up to **four discriminators**: a latent discriminator (post-reparameterization), a pre-latent discriminator (pre-reparameterization on shared encoder output), an RNA output discriminator, and an ADT output discriminator. A **Gradient Reversal Layer (GRL)** reversed gradients during backpropagation, encouraging the encoders to produce modality-invariant latent representations. Managing the adversarial dynamics with four discriminators — each with its own loss, accuracy, GRL lambda, and cumulative training pressure — proved to be the project's most complex engineering challenge, requiring careful calibration of discriminator training frequency, weight balancing, and KL recalibration to prevent latent space collapse.",
        },
        {
          id: "hyperparameter-tuning",
          title: "HYPERPARAMETER TUNING",
          content:
            "Hyperparameter optimization leveraged **Meta's Ax platform** (a wrapper around BoTorch) for multi-objective Bayesian optimization — a significant upgrade from the manual grid search used in prior projects.\n\nThe Gaussian Process-based optimization simultaneously maximized two objectives: **ADT Pearson Correlation** (reconstruction quality) and **integration score** (latent space alignment). This multi-objective approach was critical because maximizing one objective often degraded the other — a model with excellent reconstruction might maintain modality-separated clusters, while a well-integrated latent space might sacrifice reconstruction fidelity.\n\nCorrelation analysis of hyperparameters with objectives revealed that **batch size** showed 65% correlation with ADT Pearson, while **latent dimensionality** drove integration scores with 71% correlation. The **Pareto frontier** identified 4 optimal solutions balancing the trade-off between integration and correlation.\n\nHowever, quantitative metrics alone proved insufficient for model selection. Visual inspection of UMAP latent space embeddings was essential — integration scores could miss latent space collapse, while high Pearson scores sometimes masked poorly integrated clusters. The final model selection combined Pareto analysis with manual inspection of latent geometry.\n\nKey hyperparameters for the final autoencoder: latent dimension = 64, batch size = 64, learning rate = 0.0005, cyclical logistic KL annealing over 12 epochs, with carefully tuned per-modality KL weights (RNA: 5e-5, ADT: 7.9e-6). Additional optimization strategies included AdamW with cosine annealing of the learning rate and L2 regularization (1e-8) for cross-modal and adversarial training.",
        },
        {
          id: "results",
          title: "RESULTS",
          content:
            "The final model achieved a **0.75 Pearson Correlation** on the Kaggle leaderboard — surpassing the 0.73 target threshold and earning **2nd place** in the class-wide competition.\n\nThe autoencoder phase produced an excellent UMAP embedding with distinct substructure while showing significant overlap between RNA and ADT modalities in the latent space — confirming the model's success in learning modality-agnostic representations. Training converged at epoch 28, with the best model selected based on a combination of ADT Pearson, integration score, and visual inspection of latent geometry.\n\nThe cross-modal phase built on this foundation to achieve accurate RNA→ADT translation. The team also achieved a peak Pearson of 0.7668 during experimentation, but this result came from a model that did not use the proper shared encoder/decoder structure or correct reparameterization placement — a configuration the team deliberately chose not to pursue, as it violated the foundational VAE architecture.\n\nThe adversarial extension with four discriminators showed promising convergence dynamics but required more training time than the competition timeline allowed. The single-discriminator GAN approach achieved stable training with discriminator accuracy converging to an appropriate equilibrium, while the WGAN-GP variant provided enhanced stability at the cost of significantly higher computational expense.",
        },
        {
          id: "future-work",
          title: "FUTURE WORK",
          content:
            "Several directions were identified for further development. The adversarial training framework, while functional, could benefit from extended training time and more sophisticated discriminator scheduling — the four-discriminator configuration showed clear potential but was constrained by the competition deadline. The WGAN-GP approach, despite its computational cost, offered superior training stability and could yield better results with sufficient GPU resources.\n\nAdditional improvements could include attention mechanisms in the shared encoder to better capture cross-modal feature interactions, curriculum learning strategies that gradually increase cross-modal task difficulty, and contrastive learning objectives to improve latent space structure beyond what adversarial training alone achieves.",
        },
      ],
      keyMetrics: [
        { label: "PEARSON CORRELATION", value: "0.75" },
        { label: "RNA FEATURES", value: "10,000" },
        { label: "ADT PROTEINS", value: "25" },
        { label: "LATENT DIMENSION", value: "64" },
        { label: "DISCRIMINATORS", value: "4" },
        { label: "COMPETITION RANK", value: "2nd Place" },
      ],
      team: ["Steve Meadows", "Lauryn Davis", "Brooke Walters"],
      course: "CIS 678 — Machine Learning",
      timeline: "Winter 2025",
    },
  },
  {
    slug: "wine-ai-transformer",
    title: "WINE AI",
    subtitle: "Predicting Tasting Notes from Climate",
    category: "ml",
    tags: ["Transformers", "LightGBM", "NLP", "Feature Engineering", "DistilBERT", "Ensemble"],
    description:
      "Predicted wine tasting note probabilities from climate data and grape varietals using a multi-model ensemble. Achieved MAE of 0.01873 and 2nd place in competition.",
    longDescription:
      "Analyzed 10,000+ wines across 64 grape varietals to predict tasting note keyword probabilities from climate data (daily temperature, rainfall, sunshine across a full growing season). The project featured extensive feature engineering — K-means word clustering, DistilBERT PCA embeddings with Promax-rotated factor analysis for interpretability, and climate interaction features. A multi-resolution LightGBM ensemble with Tweedie loss, a custom PyTorch self-attention encoder transformer, and a feedforward neural network with focal loss were developed and compared. The factor analysis uncovered five interpretable wine profile dimensions from crisp whites to bold reds, demonstrating that the DistilBERT embeddings captured genuine semantic structure in tasting vocabulary.",
    techStack: [
      "R",
      "Python",
      "PyTorch",
      "LightGBM",
      "DistilBERT",
      "Hugging Face",
      "scikit-learn",
      "K-Means",
      "PCA",
      "SHAP",
      "Plotly",
    ],
    image: "/projects/wine-ai.png",
    github: "https://github.com/steadows/steadows.github.io/blob/main/WineAI.html",
    liveDemo: "https://steadows.github.io/WineAI.html",
    achievement: "2nd Place",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "Grand Valley's Machine Learning course (CIS 678) challenged students to predict the probability of specific **tasting note keywords** appearing in a wine review, using only climate data and grape varietal as inputs. The dataset comprised over 10,000 wines across 64 grape varietals, each associated with daily climate data from the 2022 vintage year — minimum and maximum temperatures, rainfall, and sunshine duration spanning March 1 to November 1 (246 days × 4 modalities = 984 raw climate features). The target variable was a matrix of 1,416 tasting note keyword probabilities derived from smoothed word count data.\n\nBy modeling these relationships, the project explores how environmental factors influence the language used to describe wine — offering insights into how climate conditions shape sensory perception and market reception. Performance was evaluated by **Mean Absolute Error (MAE)** on a held-out test set of 1,001 wines, scored through a class-wide Kaggle competition.",
        },
        {
          id: "exploratory-analysis",
          title: "EXPLORATORY ANALYSIS",
          content:
            "Distribution analysis of the four climate modalities revealed distinct statistical profiles. Maximum and minimum temperatures followed approximately normal distributions centered around seasonal norms, while rainfall was heavily right-skewed with many zero-rain days, and sunshine duration exhibited a bimodal pattern reflecting cloud-cover variability. These distributional differences motivated modality-specific normalization: standard scaling for temperature features, log-transformation for rainfall (to compress the heavy tail), and log + standard scaling for sunshine.\n\nThe word probability matrix was extremely sparse — approximately 80% zeros — with most tasting notes appearing infrequently across the corpus. This sparsity became a central design constraint, influencing loss function selection (focal loss for the neural network, Tweedie loss for LightGBM) and motivating the development of cluster-based features that aggregate sparse word signals into denser, more predictive representations.",
        },
        {
          id: "feature-engineering",
          title: "FEATURE ENGINEERING",
          content:
            "Feature engineering was the backbone of this project, contributing more to model performance than architecture selection alone. The team developed five categories of engineered features:\n\n**Climate Aggregations** — Moving averages at 7, 14, and 30-day windows for each modality, plus seasonal averages (spring, summer, fall rainfall), number of rainy days, maximum weekly temperature drop, rainfall type indicators (dry/moderate/wet), and climate interaction terms (rain × temperature, rain × spring frequency).\n\n**K-Means Word Cluster Probabilities** — The 1,416 tasting note keywords were grouped into 9 clusters using K-means clustering on co-occurrence patterns. For each varietal, cluster membership probabilities were computed by averaging word probabilities within each cluster, producing a compact 9-dimensional representation that captured coarse semantic groupings. A scree plot justified the choice of 9 clusters at the elbow point of within-cluster sum of squares.\n\n**DistilBERT PCA Embeddings** — For each varietal, the top 10 most probable tasting note words were concatenated into a pseudo-text and processed through DistilBERT's feature extraction pipeline to obtain 768-dimensional contextual embeddings. PCA reduced these to 5 components, capturing a substantial portion of variance while maintaining computational efficiency.\n\n**Word Entropy** — Shannon entropy of each sample's word probability distribution (with smoothing), measuring the diversity of language used in reviews. Higher entropy indicated more complex or nuanced descriptions.\n\n**Feature Importance Analysis** — Mutual information regression identified the most predictive features, enabling a reduction from 33 to 21 features. This elimination step alone improved MAE by 9% (from ~0.022 to ~0.020) without any hyperparameter tuning — demonstrating that thoughtful feature selection can outperform brute-force inclusion.",
        },
        {
          id: "factor-analysis",
          title: "FACTOR ANALYSIS",
          content:
            "To validate that the DistilBERT embeddings captured genuine semantic structure, the team performed a **Promax-rotated factor analysis** on the 5 PCA components. The rotation enhanced interpretability by allowing correlated factors, revealing five distinct wine profile dimensions:\n\n• **Factor 1 — Clean, Crisp & White:** Weighted heavily on notes like *refreshing*, *clean*, *crisp*, and *white* — corresponding to drier, crisp white wines\n• **Factor 2 — Refreshing & Fruity:** More *fruity* yet also *refreshing*, suggesting sweeter, fruity white or rosé wines\n• **Factor 3 — Balanced & Structured:** Common descriptors for drinkable, well-made red wines\n• **Factor 4 — Red, Fruity & Sweet:** Indicated *bold* yet *sweet* and *fruity* reds\n• **Factor 5 — Bold, Spicy & Dark:** Notes pointing to *spicy*, *dark*, and *bold* reds — notably lacking *acidity*, which was ubiquitous across all other factors\n\nThe absence of *acidity* in Factor 5 provided meaningful differentiation and demonstrated that the embeddings went beyond surface-level word co-occurrence. Merging the rotation data with varietal labels confirmed the theoretical groupings — Riesling and Sauvignon Blanc loaded on Factor 1, while Syrah and Malbec dominated Factor 5. Six high-frequency words (palate, flavors, finish, aromas, notes, wine) appeared in 70%+ of all samples and were removed from the factor analysis as uninformative.\n\nThis analysis confirmed that DistilBERT embeddings, combined with PCA and factor rotation, captured interpretable semantic structure in tasting vocabulary — providing the model with a principled representation of varietal-level flavor profiles.",
        },
        {
          id: "approach",
          title: "MODELING APPROACH",
          content:
            "Three complementary modeling strategies were developed, each contributing different strengths:\n\n**Multi-Resolution LightGBM Ensemble** — A gradient boosting approach using Tweedie loss, well-suited for the zero-inflated, continuous target distribution. K-means clustering grouped semantically similar target words at multiple resolutions (30, 50, 70, 90 clusters), with a separate LightGBM model trained per cluster at each resolution. Predictions were averaged across resolutions, capturing both coarse and fine-grained semantic patterns. The climate-only variant achieved MAE 0.02541; adding word cluster probabilities, DistilBERT embeddings, word entropy, and interaction features brought this down to **MAE 0.02061**.\n\n**PyTorch Encoder Transformer** — A custom transformer-based architecture (ClimateEncoderTransformer) inspired by BERT but tailored for multi-label regression. The model processes a 2-token sequence — one for the varietal (via nn.Embedding) and one for climate features (via linear projection) — through a transformer encoder with self-attention. The architecture used learned positional embeddings, GELU activation, and extracted the climate token's representation after attention to produce 1,416 keyword probability predictions via sigmoid. MAE loss was augmented with a mean penalty term to stabilize the output distribution around the dataset mean (~0.0356).\n\n**Feedforward Neural Network** — A 512→256 two-hidden-layer network with LayerNorm, ReLU, and 45% dropout, trained with focal loss to address the 80% label sparsity. While not the strongest performer, its deterministic architecture made it ideal for **SHAP-based explainability analysis**, revealing how individual features drove specific tasting note predictions.",
        },
        {
          id: "hyperparameter-tuning",
          title: "HYPERPARAMETER TUNING",
          content:
            "**LightGBM** — Bayesian optimization tuned learning rate, number of leaves, max depth, estimators, feature fraction, L1/L2 regularization, min child weight, min split gain, and Tweedie variance power. The best configuration used learning rate 0.028, 70 leaves, depth 16, 1,000 estimators, and cluster resolutions of 40/80/110. Post-prediction sparsity thresholding aligned outputs with the test data's distributional characteristics.\n\n**Transformer** — Hyperparameters were tuned across three categories using **Bayesian optimization via Ax/BoTorch**, with correlation heatmaps guiding the search:\n\n• **Network architecture:** d_model (512), mlp_mult (8 → FFN dim 4,096), num_heads (4–8), num_layers (2–3), learned vs. sinusoidal positional embeddings\n• **Logits/output:** lambda_mean (mean penalty weight), learning rate, temperature scaling\n• **AdamW optimizer:** β₁, β₂, epsilon, weight decay for L2 regularization\n\nThe best single transformer model (2 layers, 4 heads, d_model=512) achieved MAE 0.01879. Ensembling with a second model (3 layers, 8 heads, d_model=512) reduced this to **MAE 0.01873**.\n\n**Feedforward NN** — Randomized grid search across dropout rates, learning rates, batch sizes, and hidden dimensions, with 5-fold cross-validation during early experimentation. Training was monitored via validation MAE, F1, and mean probability tracking.",
        },
        {
          id: "explainability",
          title: "EXPLAINABILITY",
          content:
            "The team applied **SHAP (SHapley Additive exPlanations)** to the feedforward neural network to understand how individual features influenced specific tasting note predictions — going beyond global feature importance to per-prediction explanations.\n\nSHAP analysis compared predictions for two tasting notes with different confidence levels (0.82 vs. 0.41 predicted probability). Key findings:\n\n• **Aggregated features dominated:** Engineered features like num_rainy_days and varietal_embedding consistently had larger SHAP values than granular daily weather measurements, validating the feature engineering strategy\n• **Rainfall frequency was the strongest signal:** num_rainy_days was the most influential climate feature, reflecting its impact on grape development, disease risk, and harvest timing\n• **Feature engineering improved interpretability alongside accuracy:** The model's preference for aggregated inputs confirmed that reducing dimensionality through thoughtful engineering — rather than feeding raw daily data — improved both performance and transparency\n\nThis explainability analysis reinforced a broader principle the team emphasized: as AI systems are increasingly used in decision-making, tools like SHAP provide the context necessary for transparency and accountability — whether predicting wine flavors or informing higher-stakes policy decisions.",
        },
        {
          id: "results",
          title: "RESULTS",
          content:
            "The final ensemble achieved an **MAE of 0.01873** — earning **2nd place** in the class-wide Kaggle competition. The progression from baseline to final model demonstrates the cumulative impact of feature engineering and model selection:\n\n• LightGBM (climate-only): MAE = 0.02541\n• + Feature importance reduction (33→21 features): MAE ≈ 0.020 (9% improvement)\n• LightGBM (climate + word/DistilBERT features): MAE = 0.02061\n• Transformer encoder (single model, 2-layer): MAE = 0.01879\n• Transformer ensemble (2-layer + 3-layer): MAE = 0.01873 (final, 2nd place)\n\nBeyond the competition score, the project produced several notable findings. The mutual information-based feature importance analysis proved that **less is more** — removing 12 low-signal features improved performance without any model changes. The DistilBERT PCA embeddings, validated through Promax factor analysis, demonstrated that pretrained language models can extract interpretable semantic structure from domain-specific vocabulary — the five recovered wine profile dimensions aligned precisely with established wine categorization (crisp whites through bold reds). And SHAP analysis confirmed that the most impactful predictors were carefully engineered aggregations, not raw granular data — a lesson in the enduring value of thoughtful feature design alongside modern deep learning architectures.",
        },
      ],
      keyMetrics: [
        { label: "FINAL MAE", value: "0.01873" },
        { label: "WINES ANALYZED", value: "10,000+" },
        { label: "GRAPE VARIETALS", value: "64" },
        { label: "TASTING KEYWORDS", value: "1,416" },
        { label: "FEATURE REDUCTION", value: "33→21" },
        { label: "COMPETITION RANK", value: "2nd Place" },
      ],
      team: ["Steve Meadows", "Lauryn Davis", "Brooke Walters"],
      course: "CIS 678 — Machine Learning",
      timeline: "Winter 2025",
    },
  },
  {
    slug: "svm-dimensionality-reduction",
    title: "SVM & DIM. REDUCTION",
    subtitle: "Deconstructing Student Achievement",
    category: "ml",
    tags: ["SVM", "PCAmix", "Dimensionality Reduction", "Bayesian Optimization", "Factor Analysis", "Class Imbalance"],
    description:
      "Coupled dimensionality reduction with a Bayesian-optimized SVM to predict high school academic success from high-dimensional, mixed-type US Census survey data. Achieved 90% recall for at-risk students.",
    longDescription:
      "Developed a rigorous machine learning pipeline to predict high school academic success using high-dimensional, mixed-type survey data from the 2019 Parent and Family Involvement (PFI) Survey administered by the U.S. Census Bureau. Engineered a custom pipeline utilizing PCAmix to map the 'mixed manifold' of numeric and categorical features into 10 interpretable latent factors via Varimax rotation, fed into a cost-sensitive Radial Basis Function SVM tuned with Bayesian Optimization. Successfully handled severe class imbalance (6.6:1 ratio) through inverse-frequency class weighting and PR-AUC-driven optimization. Uncovered the 'Reactive Paradox' — statistically demonstrating that high-intensity parental help is often a lagging indicator of struggle, whereas independent study routines drive success — with real-world policy implications for identifying and supporting at-risk students.",
    techStack: ["R", "PCAmix", "SVM (RBF Kernel)", "Bayesian Optimization", "t-SNE", "Parallel Computing", "Plotly", "ggplot2"],
    image: "/projects/svm-dim-reduction.png",
    github: "https://github.com/steadows/steadows.github.io/blob/main/svm_master.html",
    liveDemo: "https://steadows.github.io/svm_master.html",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "This project investigates the drivers of secondary student academic success using data from the **2019 Parent and Family Involvement (PFI) Survey** — a nationally representative dataset administered by the U.S. Census Bureau on behalf of the National Center for Education Statistics. The dataset contains high-dimensional, mixed-type survey data spanning family demographics, parental engagement behaviors, school climate perceptions, and student outcomes for grades 6–12.\n\nThe central question: **which latent profiles of family involvement — from household structure to daily homework routines — are most strongly associated with academic success?** The target variable was derived by recoding self-reported grades into a binary indicator: students reporting mostly A's/B's were labeled \"high success,\" while those reporting mostly C's or lower were labeled \"low success.\" This binary framing introduced severe class imbalance (~6.6:1 ratio favoring high-success), making minority-class detection the core modeling challenge.\n\nUnlike traditional linear approaches, this analysis addresses the complexity of mixed numeric and categorical variables through a robust machine learning framework: **PCAmix** for dimensionality reduction, **Varimax-rotated factor analysis** for interpretability, and a **Radial Basis Function SVM** tuned via **Bayesian Optimization** — prioritizing the detection of at-risk students above all else.",
        },
        {
          id: "data-preprocessing",
          title: "DATA & PREPROCESSING",
          content:
            "The raw PFI dataset required substantial preprocessing before modeling. Grade variables were standardized so that kindergarten categories collapsed into a single value and grades 1–12 mapped onto a consistent scale. The sample was restricted to secondary students (grades 6–12), and the outcome variable was cleaned by treating special codes as missing before constructing the binary success indicator.\n\nA critical preprocessing decision involved handling the value -1, which the PFI survey uses to indicate a \"valid skip\" rather than a substantive response. Because PCAmix replaces missing values in quantitative variables with column means, retaining -1 would inject artificial values into the covariance structure. All -1 entries in numeric variables were recoded as NA. For qualitative variables, PCAmix's disjunctive (indicator) matrix treatment naturally handles missing entries by replacing them with zeros — consistent with the absence of a selected response category.\n\nThe dataset contained seven continuous variables (homework hours, parent age, household size, work hours, months worked, sibling count, and school participation frequency) alongside dozens of categorical survey responses. This mix of variable types motivated the use of PCAmix, which integrates PCA for quantitative variables with an MCA-like treatment for qualitative variables within a unified component solution.",
        },
        {
          id: "dimensionality-reduction",
          title: "DIMENSIONALITY REDUCTION",
          content:
            "**PCAmix** was applied to reduce the high-dimensional mixed-type predictor space into interpretable principal components. A scree plot of the first 30 eigenvalues revealed a steep decline through Components 1–10 (eigenvalues > ~1.9), followed by a markedly flattened curve where additional components provided diminishing returns.\n\nWhile Kaiser's criterion (eigenvalues > 1) would have suggested retaining significantly more components, this heuristic is known to over-retain in large mixed-data sets containing many categorical indicators. Instead, priority was given to components that (a) lie above the discernible elbow in the scree plot, (b) exhibit noticeably larger eigenvalue magnitudes, and (c) support interpretable rotated factors.\n\nA **10-component solution** was selected as the optimal balance between parsimony and fidelity — preserving major structural dimensions while excluding weak, noise-driven components. The retained components were projected into both training and test sets using PCAmix's predict function, creating a compact 10-dimensional feature space for downstream modeling.",
        },
        {
          id: "factor-analysis",
          title: "FACTOR ANALYSIS",
          content:
            "To enhance interpretability, a **Varimax rotation** was applied to the 10 retained components. The rotation pushed variable loadings toward either zero or one, producing a \"simple structure\" where each variable associates primarily with a single latent factor. A dominant loading approach retained only the strongest factor loading per variable (threshold > 0.30), yielding ten distinct latent constructs:\n\n• **Factor 1 — Household Structure:** Two-parent presence, marital status, household size\n• **Factor 2 — School Climate:** Satisfaction with academic standards, discipline, teachers\n• **Factor 3 — Home Engagement:** Parental homework help frequency, arts/crafts, games\n• **Factor 4 — Parent Demographics:** Caregiver relationship, employment, age\n• **Factor 5 — Residual School Climate:** Secondary variance from school perception variables\n• **Factor 6 — SES & Culture:** Income, parental education, home language, race/ethnicity\n• **Factor 7 — Homework Routines:** Student homework hours, frequency, workload perception\n• **Factor 8 — Parental Gender:** Sex of primary caregiver, weekly work hours\n• **Factor 9 — Academic Orientation & Challenges:** Expected attainment, disability, health, absenteeism\n• **Factor 10 — School Participation:** Volunteering, fundraising, committee service, sports attendance\n\nA dumbbell plot of mean standardized factor scores by success group revealed which factors most sharply discriminate between high- and low-performing students — with Household Structure (Factor 1) and Academic Challenges (Factor 9) exhibiting the widest separation.",
        },
        {
          id: "key-findings",
          title: "KEY FINDINGS",
          content:
            "Analysis of the factor profiles uncovered three critical themes with real-world policy implications:\n\n**The \"Reactive Paradox\"** — The most striking finding was the inversion between Factors 3 and 7. Students receiving the most frequent parental homework help (3+ days/week) exhibited the **highest probability of low success**, while students who independently completed homework 5+ days/week were significantly more likely to be in the high-success group. This reveals that intensive parental assistance is often a **lagging indicator** of existing academic deficits — a reactive intervention rather than a proactive driver of achievement. Effective support strategies should prioritize fostering student autonomy over direct remediation.\n\n**Structure as the Baseline** — Household stability (Factor 1) exhibited the largest magnitude of separation between groups. Students in two-parent households showed overwhelmingly higher success rates, consistent with \"Resource Dilution\" theory where two guardians increase available time and financial resources per child. This structural advantage acts as a multiplier for all other factors — a student with high structural stability may weather challenges that would derail a student lacking those resources.\n\n**Systemic Stratification** — Persistent gaps across income, parental education, and race/ethnicity (Factor 6) confirmed that socioeconomic context establishes a foundational gradient for achievement. A notable jump in success rates appeared for parents holding at least a Bachelor's degree, reflecting both economic stability and familiarity with the educational system. These non-academic barriers remain potent inhibitors of achievement, interacting with behavioral factors in complex, non-linear ways.",
        },
        {
          id: "approach",
          title: "APPROACH",
          content:
            "The modeling pipeline coupled PCAmix dimensionality reduction with a cost-sensitive **Radial Basis Function (RBF) SVM** classifier. The RBF kernel maps input vectors into a high-dimensional feature space where non-linear relationships become linearly separable — critical for this dataset, where **t-SNE visualization** revealed multi-modal cluster structures with distinct \"islands\" of success rather than simple linear separation. This confirmed that student success is heterogeneous: multiple distinct parental profiles — unique combinations of resources, engagement levels, and household structures — can independently lead to high achievement.\n\nTo address the severe class imbalance (6.6:1 ratio), **class weights** proportional to inverse class frequencies were incorporated directly into the SVM's penalty term. Misclassifying a minority \"low-success\" case incurred nearly **7× the penalty** of misclassifying a \"high-success\" case, preventing the classifier from defaulting to the majority class.\n\n**Bayesian Optimization** with an Expected Improvement acquisition function tuned cost (C) and gamma (γ) over 5-fold stratified cross-validation, parallelized across multiple CPU cores. Performance was evaluated using **Precision-Recall AUC** for the minority class — chosen over ROC-AUC because it provides a more direct measure of the classifier's ability to identify and rank at-risk students without inflation from true negatives. The optimization converged on cost = 0.10 and gamma = 0.01, yielding a smooth, heavily regularized decision boundary — consistent with the finding that overly flexible or localized boundaries overfit the majority class and degrade minority-class ranking.",
        },
        {
          id: "results",
          title: "RESULTS",
          content:
            "The final 10-component model achieved **~90% recall** for at-risk students — correctly identifying 9 out of 10 low-success students — with a test PR-AUC of **0.634** and ROC-AUC of **0.924**. The confusion matrix (221 TP, 320 FP, 26 FN, 1,302 TN) reflects the deliberate design priority of minimizing false negatives over false positives.\n\nComparison across dimensionality levels confirmed the 10-component model's superiority:\n\n• **10 components:** Recall = 89.5%, PR-AUC = 0.634, ROC-AUC = 0.924\n• **5 components:** Recall = 81.4%, PR-AUC = 0.517, ROC-AUC declined\n• **3 components:** Recall = 78.5%, PR-AUC = 0.475, ROC-AUC = 0.849\n\nAggressive dimensionality reduction degraded minority-class detection, demonstrating that the full 10-factor representation preserved critical mixed-data structure.\n\nIn an educational context, the model's higher false-positive rate carries an **asymmetric cost**. Students incorrectly flagged as at-risk receive additional mentoring, resources, and support — interventions that reinforce positive behaviors even for students who may not strictly need them. This framing transforms false positives from prediction errors into opportunities to expand support for students on the margins of success, making the model a **comprehensive safety net** rather than a mere prediction tool.",
        },
        {
          id: "future-work",
          title: "FUTURE WORK",
          content:
            "Future directions include incorporating **longitudinal data** to determine whether \"reactive\" parental help eventually transitions into independent success over time — the cross-sectional nature of the 2019 PFI survey limits causal inference. Expanding the feature set to include **school-level funding and resource data** could help disentangle home environment effects from institutional quality.\n\nThe framework could also be extended to **multi-class prediction** (distinguishing A-students from B-students from C-students) or integrated with ensemble methods for improved precision alongside the existing high recall. Additionally, the factor analysis could be refined with oblique rotation methods to allow correlated factors, potentially revealing interaction effects between household structure and engagement behaviors that the orthogonal Varimax rotation may have suppressed.",
        },
      ],
      keyMetrics: [
        { label: "AT-RISK RECALL", value: "~90%" },
        { label: "TEST PR-AUC", value: "0.634" },
        { label: "ROC-AUC", value: "0.924" },
        { label: "OVERALL ACCURACY", value: "81.5%" },
        { label: "LATENT FACTORS", value: "10" },
        { label: "CLASS WEIGHT RATIO", value: "6.6:1" },
      ],
      team: ["Steve Meadows"],
      course: "CIS 678 — Machine Learning",
      timeline: "Fall 2024",
    },
  },

  // ─── Active / Personal Projects ──────────────────────────────────────────────
  {
    slug: "dinnerbot",
    title: "DINNERBOT",
    subtitle: "AI-Powered Meal Planning",
    category: "ml",
    tags: [
      "Gemini LLM",
      "Serverless",
      "GCP",
      "Telegram Bot",
      "Firestore",
      "Conversational AI",
      "Intent Detection",
    ],
    description:
      "Serverless weekly meal planner powered by Google Gemini with a Gordon Ramsay persona. Generates dinner options, handles selections via Telegram, and produces aisle-grouped grocery lists.",
    longDescription:
      "A production-deployed serverless application that generates personalized weekly dinner options using Google Gemini (with a Gordon Ramsay persona), delivered through an interactive Telegram bot with inline keyboard selection. Features a full conversational AI layer with 9-intent detection, memory-enriched context (last 10 messages with metadata, meal history, auto-favorites, staleness detection, pending feedback loops), aisle-grouped grocery list generation, and on-demand recipe expansion. Built on Google Cloud Platform with Cloud Functions (2nd Gen), Firestore, Cloud Scheduler, and Secret Manager. All LLM prompts use the RISEN framework with XML-structured tags for consistent, high-quality outputs.",
    techStack: [
      "Python",
      "Google Gemini",
      "GCP Cloud Functions",
      "Firestore",
      "Telegram Bot API",
      "Cloud Scheduler",
      "Secret Manager",
      "Cloud Build",
      "Flask",
    ],
    image: "/projects/dinnerbot.png",
    github: "https://github.com/steadows/dinnerbot",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "DinnerBot is a production-deployed serverless application that generates personalized weekly dinner menus, delivers them through Telegram, and produces aisle-grouped grocery lists — all through the persona of Gordon Ramsay. The project started from a simple question: what if you had a private executive chef who knew your family's dietary constraints, remembered what you've cooked recently, and could plan your dinners with a single message?\n\nThe system runs on Google Cloud Platform as a pair of Cloud Functions: one triggered weekly by Cloud Scheduler to generate three dinner options tailored to the family's profile (high protein, no wheat/mushrooms/olives/seed oils, hidden vegetables for a toddler), and a second serving as a Telegram webhook to handle all inbound interactions — button taps, text commands, conversational messages, and feedback. Google Gemini powers the language model, structured through the **RISEN prompting framework** with XML tags for consistent, high-quality outputs.\n\nWhat elevates DinnerBot beyond a simple recipe generator is its conversational intelligence layer. The bot tracks conversation history with metadata enrichment, detects nine distinct intents from free-form text, maintains meal history with auto-favoriting, detects interaction staleness, and proactively solicits meal feedback — all while staying in character as a warm, practical Gordon Ramsay who remembers what the family loves.",
        },
        {
          id: "architecture",
          title: "ARCHITECTURE",
          content:
            "DinnerBot follows a **service-oriented architecture** with five distinct modules, each responsible for a single domain:\n\n**LLMService** — Google Gemini integration with five RISEN-framework prompts (recipe generation, grocery list, recipe detail, conversational, retry fallback). Handles intent detection via keyword/regex matching, JSON response parsing with validation, and a retry strategy with progressively simpler prompts. Falls back to hardcoded DEFAULT_RECIPES when all retries are exhausted.\n\n**DBService** — Firestore CRUD layer managing three collections: meal_sessions (recipe options with selection state machine), meal_history (per-recipe tracking with selection counts, favorite status, and feedback), and conversation_history (message log with metadata, staleness timestamps, and pending feedback state). Documents are keyed by platform-prefixed user_id to support future multi-platform expansion.\n\n**TelegramService** — Telegram Bot API wrapper handling outbound message formatting (HTML for recipes, plain text for grocery lists), inline keyboard construction with session-encoded callback data, callback query acknowledgment, and slash command registration with BotFather. Uses a persistent asyncio event loop to bridge Telegram's async API with Flask's synchronous request model.\n\n**Config** — Two-tier configuration abstraction: environment variables for local development (.env via python-dotenv), Google Secret Manager for production. Properties are lazy-loaded with a sentinel pattern to distinguish \"not initialized\" from \"initialization failed.\"\n\n**UserProfileService** — Family profile management with Firestore-backed overrides merged on top of sensible defaults. Profiles include dietary restrictions, equipment availability, portion preferences, skill level, and special instructions (hidden vegetables, leftover-friendly meals, no-fuss weeknight cooking).\n\nThe entry points live in main.py — two Cloud Functions that serve as thin HTTP handlers, delegating all logic to the service modules. The cron trigger generates and sends recipes; the webhook handler validates, routes, and responds to all inbound Telegram updates.",
        },
        {
          id: "conversational-ai",
          title: "CONVERSATIONAL AI",
          content:
            "The conversational AI layer is what makes DinnerBot feel like an actual chef rather than a command-line tool. At its core is the **RISEN (Role, Instructions, Steps, End goal, Narrowing)** prompting framework — every prompt sent to Gemini is structured with XML tags (<role>, <instructions>, <steps>, <end_goal>, <narrowing>) that separate instructions from dynamic data, producing consistent, high-quality outputs.\n\n**Context Assembly** — Each conversational response draws from five context sources injected into the prompt via dedicated XML sections: <family_profile> (dietary constraints, equipment, preferences), <meal_history> (last 5 meals with timestamps, selection counts, favorite status), <conversation_history> (last 10 messages with metadata-enriched descriptions), <pending_meals> (current menu options if active), and optional <staleness> and <pending_feedback> tags that shape the conversational tone.\n\n**Metadata Enrichment** — Raw conversation logs are transformed into semantically rich context before being injected into prompts. A user message of \"2\" becomes \"User selected Butter Chicken.\" A message of \"favorites\" becomes \"User asked to see their favorites.\" This enrichment layer ensures Gemini understands the conversational arc rather than seeing a stream of cryptic numbers and keywords.\n\n**Memory Systems** — The bot maintains two forms of memory: short-term conversation history (last 10 messages with metadata) and long-term meal history (every selection, with timestamps, frequency counts, and feedback). Meals selected three or more times are automatically flagged as favorites. This enables Gordon to naturally reference past meals — \"You loved that Butter Chicken last week\" or \"We haven't done beef in a while.\"\n\n**Staleness Detection** — When more than 24 hours pass between interactions, a <staleness> context tag is injected, prompting Gordon to acknowledge the gap naturally (\"Welcome back!\" or \"Right, where were we?\") rather than continuing as if the conversation never stopped.\n\n**Feedback Loop** — After sending a grocery list, the system sets a pending_feedback flag. On the next interaction, a <pending_feedback> tag prompts Gordon to ask how the meal turned out. Feedback (\"loved it\", \"it was okay\", \"skip next time\") is parsed via sentiment extraction and stored against the meal history entry, building a preference profile over time.",
        },
        {
          id: "features",
          title: "FEATURES",
          content:
            "**Intent Detection** — The system routes free-form text to one of nine handlers through a keyword/regex matching pipeline: selection (meal pick), regenerate (new options), recipe_detail (expand a recipe), history (recent meals), generate_now (on-demand menu), favorites (go-to dishes), help (command list), feedback (meal review), and conversational (catch-all to Gemini). Slash commands (/start, /help, /menu, /favorites, /cancel) take priority over intent routing.\n\n**Meal Selection** — Users pick meals via inline keyboard buttons (1, 2, 3) or text replies. The handler validates the selection against the pending session, marks it complete, saves to meal history (incrementing times_selected and checking the auto-favorite threshold), and triggers grocery list generation — all as a single atomic flow.\n\n**Aisle-Grouped Grocery Lists** — After selection, Gemini generates a grocery list scaled for the family's portion size, grouped by store section (Protein, Produce, Dairy, Pantry). The prompt enforces practical quantities and respects dietary restrictions (no seed oils — butter, olive oil, avocado oil, or coconut oil only).\n\n**On-Demand Generation & Regeneration** — Users can request new menus at any time (\"what's for dinner\", \"plan dinner\") or reject current options (\"try again\", \"something else\"). The system handles the full session lifecycle — expiring old sessions, generating fresh recipes, creating new Firestore documents, and sending updated inline keyboards.\n\n**Recipe Detail Expansion** — Users can ask \"tell me more about option 2\" to get a full recipe breakdown: numbered cooking steps, the hidden-veggie strategy, protein content, and a Gordon tip — all generated on demand via a dedicated RISEN prompt.\n\n**Non-Text Handling** — Photos, stickers, voice messages, and other non-text content are detected by content type and handled gracefully with an in-character response: \"I can only read text messages, love. Type something or tap a button.\"",
        },
        {
          id: "deployment",
          title: "DEPLOYMENT",
          content:
            "DinnerBot runs on Google Cloud Platform as a fully serverless stack with zero always-on infrastructure:\n\n**Cloud Functions (2nd Gen)** — Two functions deployed to us-central1 with 512MB memory and 120-second timeout. The trigger function (cron_trigger_recipes) is HTTP-triggered with no public access, invoked by Cloud Scheduler with OIDC authentication. The webhook function (telegram_webhook) is publicly accessible — Telegram needs to reach it — but validated via a secret token header on every request.\n\n**Firestore** — Three collections manage all persistent state. meal_sessions stores recipe options with a selection state machine (pending_selection → completed | expired | send_failed). meal_history tracks per-recipe data with selection counts, timestamps, favorite flags, and feedback values. conversation_history maintains the message log with metadata, last_interaction_at for staleness detection, and pending_feedback state.\n\n**Cloud Scheduler** — A weekly cron job (Sundays at 10 AM Eastern) triggers the recipe generation function via authenticated HTTP POST, producing a new menu every week automatically.\n\n**Secret Manager** — Stores GEMINI_API_KEY, TELEGRAM_BOT_TOKEN, and TELEGRAM_WEBHOOK_SECRET. Cloud Functions access secrets at runtime via IAM-bound service account permissions — no credentials are embedded in code or environment variables in production.\n\n**Cloud Build** — A cloudbuild.yaml defines the CI/CD pipeline with parallel deployment of both Cloud Functions on push to main, with all secrets and environment variables configured to match the production deployment.",
        },
        {
          id: "engineering-details",
          title: "ENGINEERING DETAILS",
          content:
            "**Error Handling** — LLM calls are wrapped in try/except with a two-tier retry strategy: the primary RISEN prompt first, then a simplified retry prompt that strips context to maximize JSON compliance. If both fail, hardcoded DEFAULT_RECIPES ensure the user always gets a response. Telegram webhook handlers always return HTTP 200 — even on internal errors — to prevent Telegram from retrying and causing duplicate processing. All user-facing error messages stay in character: \"Bloody hell, something went wrong on my end. Give it another go in a few minutes.\"\n\n**Platform Abstraction** — Every database operation uses a platform-prefixed user_id (\"telegram_{chat_id}\") rather than raw platform identifiers. This abstraction — carried through DBService, LLMService, UserProfileService, and all handler functions — means adding a new messaging platform (SMS, WhatsApp, Discord) requires only a new service module and webhook handler, with zero changes to the core logic. The Twilio SMS extension is architecturally ready but blocked pending phone number verification.\n\n**Async Bridge** — Telegram's python-telegram-bot library is async-first, but Cloud Functions runs Flask (synchronous). TelegramService bridges this with a persistent asyncio event loop and a thread pool executor, avoiding the overhead of creating new loops per request while handling both async and synchronous calling contexts.\n\n**Session Lifecycle** — Sessions follow a state machine (pending_selection → completed | expired | send_failed) with built-in guards: selection handlers validate session ownership, status, and option validity before processing. Expired or completed sessions are rejected gracefully with in-character messages guiding the user toward valid actions.\n\n**Conversation Pruning** — Conversation history is capped at 20 stored messages (2× the 10-message context window) to prevent unbounded Firestore document growth while maintaining sufficient history for metadata-enriched context assembly.",
        },
      ],
      keyMetrics: [
        { label: "INTENT TYPES", value: "9" },
        { label: "RISEN PROMPTS", value: "5" },
        { label: "CONTEXT SOURCES", value: "5" },
        { label: "SERVICE MODULES", value: "5" },
        { label: "MEMORY WINDOW", value: "10 msgs" },
        { label: "AUTO-FAVORITE", value: "3× selected" },
      ],
      team: ["Steve Meadows"],
      timeline: "2025",
    },
  },

  // ─── Statistics (Medium Priority) ──────────────────────────────────────────
  {
    slug: "laplace-distribution",
    title: "LAPLACE DISTRIBUTION",
    subtitle: "Interactive Statistical Explorer",
    category: "stats",
    tags: ["Probability", "Interactive", "Shiny", "Monte Carlo", "Heavy Tails", "Simulation"],
    description:
      "Interactive R Shiny application for exploring the Laplace (Double Exponential) distribution — featuring PDF/CDF visualization, Monte Carlo simulation with heavy-tail analysis, and real-world case studies.",
    longDescription:
      "Built a fully interactive R Shiny web application for exploring the Laplace (Double Exponential) distribution, deployed to shinyapps.io with five tabs spanning education and computation. Features real-time PDF/CDF visualization with adjustable location and scale parameters, a Normal distribution overlay highlighting the Laplace's sharp peak and heavy tails, integrated probability and quantile calculators, a Monte Carlo simulation engine (10–10,000 samples) with convergence demonstration and empirical heavy-tail comparison metrics, and three curated real-world case studies. Built with bslib Bootstrap 5 theming, Plotly interactive charts, nimble for Laplace distribution functions not available in base R, custom JavaScript for viewport-locked layout and throttled slider input, and MathJax-rendered mathematical formulas.",
    techStack: ["R", "Shiny", "bslib", "Plotly", "ggplot2", "nimble", "moments", "MathJax", "JavaScript", "CSS"],
    image: "/projects/laplace-distribution.png",
    liveDemo: "https://ll7bfl-steve-meadows.shinyapps.io/project_1/",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "This project is a fully interactive web application built for **STA 532 — Applied Statistics** at Grand Valley State University. It provides an educational and computational exploration of the **Laplace distribution** (also known as the Double Exponential distribution) — a probability distribution first introduced in 1774 by Pierre-Simon Laplace as his \"First Law of Errors.\"\n\nThe Laplace distribution is the Normal distribution's more rugged cousin. Where the bell curve models errors based on their squared magnitude, the Laplace models errors based on their **absolute magnitude**, producing two defining characteristics: a sharp cusp at the center (ideal for data that clusters tightly around a specific value) and heavy tails (assigning much higher probability to extreme events than the Normal). These properties make it a cornerstone of robust statistical modeling in fields ranging from finance to data privacy.\n\nThe application spans **five tabs** — About, Applications, PDF, CDF, and Simulation — providing both theoretical grounding and hands-on computational tools. Users can manipulate distribution parameters in real time, compute exact probabilities and quantiles, run Monte Carlo simulations with configurable sample sizes, and compare the Laplace's behavior against the Normal distribution across every visualization. The app is deployed to **shinyapps.io** and built with approximately 1,760 lines of R, JavaScript, and CSS.",
        },
        {
          id: "interactive-tools",
          title: "INTERACTIVE TOOLS",
          content:
            "The core of the application is a suite of interactive visualization and computation tools spread across the PDF and CDF tabs.\n\n**PDF Explorer** — The PDF tab renders the Laplace probability density function in real time as users adjust the location parameter (µ, range −10 to 10) and scale parameter (b, range 0.1 to 5). A toggleable **Normal distribution overlay** plots a Normal curve with identical mean and variance (σ² = 2b²), making the Laplace's sharp peak and heavy tails immediately visible by direct comparison. The x-axis range is independently adjustable (−30 to 30), and four stat cards display the theoretical mean, variance (2b²), excess kurtosis (always 3), and skewness (always 0) — all updating reactively as parameters change.\n\n**CDF with Probability Calculator** — The CDF tab visualizes the cumulative distribution function with the same parameter controls. An integrated **probability calculator** evaluates P(X ≤ x) at any user-specified x value, displaying the result to six decimal places with corresponding dashed crosshair annotations on the CDF plot. A **quantile calculator** (inverse CDF) takes a probability p and returns the x value satisfying P(X ≤ x) = p, using nimble's qdexp function.\n\n**Synchronized Shaded-Area Plot** — Below the CDF curve, a second PDF plot renders in sync, shading the area under the density curve up to the user-specified x value. This dual visualization connects the abstract CDF value to its geometric interpretation on the density — users see both the cumulative probability and the corresponding shaded region simultaneously.\n\nAll plots are rendered as **Plotly interactive charts** via ggplotly, supporting hover tooltips with unified hover mode, pan/zoom, and PNG export. Slider inputs use a custom **40ms throttle** (overriding Shiny's default release-only behavior) via a JavaScript binding override, enabling smooth real-time parameter exploration without waiting for slider release.",
        },
        {
          id: "simulation-engine",
          title: "SIMULATION ENGINE",
          content:
            "The Simulation tab provides a full **Monte Carlo sampling engine** for empirical exploration of the Laplace distribution.\n\n**Configurable Sampling** — Users set the sample size (n = 10 to 10,000, step 10), location and scale parameters, and an optional random seed for reproducibility. Clicking \"Generate Sample\" draws n observations from the Laplace distribution using nimble's rdexp function and renders a histogram overlaid with the theoretical density curve. As n increases, the histogram visibly converges to the theoretical Laplace PDF — a direct demonstration of the Law of Large Numbers.\n\n**Normal Overlay Comparison** — A toggleable Normal distribution overlay (with matched mean and variance) can be superimposed on the simulation histogram, allowing users to compare the empirical Laplace sample against both the theoretical Laplace curve and the equivalent Normal density simultaneously.\n\n**Summary Statistics Panel** — Seven real-time summary statistics are computed from each generated sample: n, mean, median, standard deviation, kurtosis (via the moments package), minimum, and maximum. These values update with every new sample, letting users observe sampling variability and track convergence of empirical moments toward their theoretical values.\n\n**Heavy-Tail Comparison** — The most distinctive feature of the simulation tab is a four-panel comparison grid that quantifies the Laplace distribution's fat-tail property with real data. For each sample, the application computes the empirical percentage of observations falling beyond **2 standard deviations** and **3 standard deviations** from the mean, displayed alongside the Normal distribution's theoretical expectations (4.55% and 0.27%, respectively). With typical Laplace samples, users observe empirical values roughly **double** the Normal expectation at 2σ and significantly higher at 3σ — providing visceral, data-driven evidence of heavy-tail behavior.",
        },
        {
          id: "real-world-applications",
          title: "REAL-WORLD APPLICATIONS",
          content:
            "The Applications tab presents three curated case studies demonstrating where the Laplace distribution outperforms Normal-based models in practice. Each case study follows a consistent structure — The Problem, The Laplace Solution, and a concrete Case Study — rendered in a responsive card grid with hover effects.\n\n**Finance & Black Swans** — Traditional financial models use the Normal distribution, which treats extreme market moves as nearly impossible events. In reality, stock returns exhibit heavy tails — crashes and spikes occur far more frequently than a bell curve predicts. Analysts use the Laplace distribution to model asset returns and \"volatility smiles,\" enabling banks to calculate more realistic **Value-at-Risk (VaR)** estimates that provide adequate capital buffers for Black Swan events.\n\n**Machine Learning & Sparsity (LASSO)** — When building models with thousands of variables, identifying which features actually matter is critical. **LASSO regression** uses a Laplace prior (L1 penalty), exploiting the distribution's sharp, needle-like peak at zero to mathematically force unimportant variable coefficients to exactly zero. This produces sparse models that perform automatic feature selection — enabling researchers to identify the handful of critical genes in a genomic study or the most important indicators in an economic forecast.\n\n**Data Privacy & The Laplace Mechanism** — The cornerstone of **differential privacy** is the Laplace Mechanism: adding carefully calibrated Laplace noise to database query results. Because of the Laplace distribution's unique mathematical properties, this provides a formal privacy guarantee — the result of any query looks essentially the same whether a specific individual's data is included or not. This technique protects individual privacy in large-scale census data, tech-company analytics, and healthcare trend reporting while preserving aggregate statistical accuracy.\n\nThe tab also features a summary infographic synthesizing the distribution's key properties and applications into a single visual reference.",
        },
        {
          id: "design-engineering",
          title: "DESIGN & ENGINEERING",
          content:
            "Significant engineering effort went into making the application feel polished and responsive rather than a typical academic Shiny prototype.\n\n**Viewport-Locked Layout** — All interactive tabs (PDF, CDF, Simulation) are locked to the browser viewport with no page scrolling. A custom JavaScript function (resizePlots) dynamically calculates available height by subtracting the navbar, formula callouts, stat cards, and padding from the viewport height, then resizes each Plotly container to fill the remaining space. This function fires on window resize, tab switch (via Bootstrap's shown.bs.tab event), and after every Shiny render cycle — ensuring plots always fill the screen regardless of browser dimensions.\n\n**Animated Splash Screen** — The app opens with a full-screen splash overlay featuring a CSS keyframe entrance animation (fade + scale from 88% with a 15px vertical offset over 0.9s using a custom cubic-bezier easing) followed by a 5-second display period, then a cinematic exit animation (subtle brightness flash at 8%, progressive zoom-blur dissolve over 1.3s with the blur reaching 20px at full opacity fadeout). The overlay is removed from the DOM after 6.5 seconds via setTimeout.\n\n**Bootstrap 5 Theming** — The UI is built with bslib (not shinydashboard), using Bootstrap 5 with a warm color palette (primary: #E8713A, background: #FDF6EE, foreground: #1a1a2e) and Google Fonts (Inter for body text, Fira Code for monospaced elements). Custom CSS extends the theme with card hover effects (translateY lift + shadow intensification), scrollable sidebars with styled scrollbars, responsive grid breakpoints, and consistent stat card styling.\n\n**Throttled Slider Input** — Shiny's default slider behavior only sends values on mouse release. A custom JavaScript snippet overrides the shiny.sliderInput binding's getRatePolicy method, replacing it with a 40ms throttle policy. This enables smooth, real-time parameter exploration — users see the plot update continuously as they drag, not just when they release.\n\n**Pre-Rendered Hidden Tabs** — By default, Shiny suspends outputs on hidden tabs to save computation. This app sets suspendWhenHidden = FALSE for all four plot outputs and overrides Bootstrap's tab hiding with CSS (display: block with opacity/pointer-events toggling instead of display: none), ensuring all Plotly charts are pre-rendered with correct dimensions when the user first switches tabs.\n\n**Responsive Design** — The CSS includes breakpoints at 992px, 768px, and 480px that reflow card grids, adjust stat card sizing, and collapse multi-column layouts to single columns on mobile devices.",
        },
        {
          id: "mathematical-foundation",
          title: "MATHEMATICAL FOUNDATION",
          content:
            "The application renders all mathematical content through **MathJax**, providing publication-quality formula display inline with the interactive tools.\n\n**PDF Formula** — The probability density function is displayed as: f(x | µ, b) = (1/2b) · exp(−|x − µ|/b), defined for all real x. The formula is rendered in a callout box directly above the interactive plot, providing immediate reference as users manipulate parameters.\n\n**CDF Formula** — The piecewise cumulative distribution function is rendered with cases notation: F(x) = (1/2) · exp((x − µ)/b) for x < µ, and F(x) = 1 − (1/2) · exp(−(x − µ)/b) for x ≥ µ. This piecewise structure reflects the Laplace's construction as two back-to-back exponential distributions.\n\n**Key Properties** — The stat cards and educational content highlight the Laplace distribution's defining characteristics:\n\n• **Mean** = µ (the location parameter directly controls the center)\n• **Variance** = 2b² (grows quadratically with the scale parameter)\n• **Excess Kurtosis** = 3 (constant, independent of parameters — compared to 0 for the Normal, indicating much heavier tails)\n• **Skewness** = 0 (perfectly symmetric about µ, like the Normal)\n\n**nimble Package Integration** — The Laplace distribution functions (ddexp, pdexp, qdexp, rdexp — density, CDF, quantile, and random generation) are not available in base R. The application uses the **nimble** package, which provides these as part of its extended distribution library. This was a deliberate technical choice that enabled clean, consistent computation across all tabs without reimplementing the distribution functions from scratch.\n\n**Normal Comparison** — When the Normal overlay is enabled, the application constructs a Normal distribution with identical mean (µ) and variance (2b²), yielding σ = b√2. This matched-moment comparison isolates the distributional shape difference — the Laplace's sharper peak and heavier tails become immediately apparent, even though both distributions share the same first two moments.",
        },
      ],
      keyMetrics: [
        { label: "INTERACTIVE TABS", value: "5" },
        { label: "LINES OF CODE", value: "~1,760" },
        { label: "SAMPLE RANGE", value: "10–10K" },
        { label: "CASE STUDIES", value: "3" },
        { label: "EXCESS KURTOSIS", value: "3" },
        { label: "SLIDER THROTTLE", value: "40ms" },
      ],
      team: ["Steve Meadows"],
      course: "STA 532 — Applied Statistics",
      timeline: "Fall 2024",
    },
  },
  {
    slug: "gun-violence-geospatial",
    title: "GUN VIOLENCE ANALYSIS",
    subtitle: "Geospatial Intelligence",
    category: "stats",
    tags: [
      "Geospatial",
      "Visualization",
      "Hypothesis Testing",
      "Permutation Testing",
      "Bootstrap",
      "Census Data",
      "Public Policy",
    ],
    description:
      "Multi-scale geospatial analysis of U.S. gun violence integrating Gun Violence Archive data with Census Bureau demographics. Revealed that poverty predicts lethality — not incidence — through Welch's t-test, permutation testing, and bootstrap inference.",
    longDescription:
      "Conducted a rigorous multi-scale geospatial and statistical analysis of ~239K gun violence incidents (Gun Violence Archive, 2014–2017) integrated with U.S. Census Bureau state-level and county-level demographic data — population, income, poverty, rent, housing costs, and gender proportions. Built an interactive Leaflet choropleth from TIGER/Line shapefiles, developed a custom geoid recovery strategy achieving 99.8% geographic completeness, and performed per-capita normalization revealing that raw counts are deeply misleading. Correlation analysis uncovered the central finding: poverty has near-zero correlation with gun violence incidence but moderate positive correlation with death rates — poverty predicts whether people die, not whether violence happens. Validated through Welch's t-test (p = 0.033), 1,000-permutation Monte Carlo test (p = 0.011), and 10,000-sample bootstrap confidence interval [11.6, 48.0] deaths per 100K.",
    techStack: [
      "R",
      "tidyverse",
      "sf",
      "leaflet",
      "Plotly",
      "ggplot2",
      "ggcorrplot",
      "naniar",
      "flextable",
      "infer",
      "lubridate",
      "skimr",
      "scales",
    ],
    image: "/projects/gun-violence.png",
    github: "https://github.com/steadows",
    liveDemo: "https://steadows.github.io/240612_meadoant_final_project.html",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "This project is a comprehensive geospatial and statistical analysis of gun violence in the United States, completed for **STA 418/518 — Introduction to Statistics** at Grand Valley State University. The primary dataset comes from the **Gun Violence Archive (GVA)**, a nonprofit that collects verified records of gun-related incidents across the U.S. The raw dataset contains approximately 239,000 incidents spanning January 2013 through March 2018, with each record capturing location (state, city, geoid, latitude/longitude), date, number killed, number injured, and dozens of participant-level attributes.\n\nBecause 2013 and 2018 are incomplete in the archive (only 279 incidents from 2013, notably missing the Las Vegas mass shooting), the analysis filters to a clean four-year window: **2014–2017**, providing consistent year-over-year comparisons. To move beyond raw counts, the project integrates **U.S. Census Bureau** state-level and county-level demographic data — population, median income, poverty rates, rent costs, housing costs, and gender proportions — enabling per-capita normalization and socioeconomic correlation analysis.\n\nThe project proceeds through a deliberate analytical arc: data cleaning and missingness recovery, state-level exploratory analysis with per-capita normalization, city-level drill-down with correlation matrices, interactive geospatial visualization via Leaflet, and rigorous inferential statistics — Welch's t-test, permutation testing, and bootstrap confidence intervals — all converging on a central finding about the relationship between poverty and gun violence lethality.",
        },
        {
          id: "data-cleaning",
          title: "DATA CLEANING",
          content:
            "The raw GVA dataset required several preprocessing steps before analysis. Date strings were parsed to datetime format using **lubridate**, enabling extraction of year and month for temporal analysis. City names were cleaned by stripping parenthetical qualifiers and trimming whitespace to ensure consistent joins with Census data.\n\n**Missingness Analysis** — An initial missingness plot (via **naniar**'s gg_miss_var) revealed that latitude, longitude, and geoid values were the most incomplete fields — and their missingness was correlated: rows missing lat/long were almost always missing geoid as well. A state-level missingness heatmap identified Idaho, Indiana, South Dakota, Virginia, and West Virginia as the states with the highest proportions of missing location data.\n\n**Geoid Recovery Strategy** — The geoid (geographic identifier) is critical for merging incident data with Census Bureau shapefiles and demographic tables. Over **8,000 rows** were missing geoid values. Rather than dropping these records, the project implemented a custom imputation approach: for each incident missing a geoid, the system cross-referenced other incidents sharing the same **city, state, and year** that had valid geoids, and copied the geoid over. This strategy reduced missing geoid values from 8,000+ to just **443** — achieving **99.8% completeness** for the geographic identifier. Post-recovery, only Hawaii, Idaho, Vermont, and West Virginia retained missingness above 1%, and these states contribute minimally to the top incident and death counts.\n\n**Post-Cleaning Validation** — After recovery, a bar plot of remaining missing geoids by state confirmed that the highest absolute counts of nulls occurred in high-incident states (where a few hundred missing out of tens of thousands is negligible), while the proportional missingness in smaller states was confirmed as statistically inconsequential to downstream analysis.",
        },
        {
          id: "state-level-analysis",
          title: "STATE-LEVEL ANALYSIS",
          content:
            "State-level analysis began with 2017 — the year with the highest incident count — using raw incident totals. The initial bar chart showed Illinois, California, Florida, and Texas dominating, which tracks intuitively with population. But raw counts are misleading.\n\n**Per-Capita Normalization** — By merging state-level Census population data and computing **incidents per 100,000 people**, the rankings shifted dramatically. The **District of Columbia** emerged as an extreme outlier — but DC is a federal district functioning more like a single city than a state, so it was excluded for fair state-to-state comparison. With DC removed, **Alaska** took the top spot, followed by **Delaware** — two states rarely associated with gun violence in popular discourse. Illinois, despite its reputation, ranked substantially lower after population adjustment.\n\n**Gun Ownership Tangent** — Alaska's per-capita dominance prompted investigation into gun ownership rates. Alaska has an estimated 64.5% gun ownership rate (the highest in the nation), suggesting a plausible correlative factor. However, Delaware — ranked 2nd in per-capita incidents — has only 34.4% gun ownership (10th lowest), and Illinois ranks 7th lowest at 27.8%. This inconsistency between ownership rates and incident rates indicated that gun ownership alone is an insufficient explanatory variable, motivating deeper analysis at the city level.\n\n**Interactive Leaflet Choropleth** — To visualize the geographic distribution, U.S. Census Bureau **TIGER/Line shapefiles** (cb_2018_us_state_500k) were loaded via the **sf** package, merged with the per-capita incident data on formatted GEOID, transformed to WGS84 CRS, and rendered as a **Leaflet choropleth map**. The map uses population-normalized coloring (PuBu palette with quantile-based bins) and HTML popup labels displaying state name, population, raw incident count, and per-capita rate on hover.\n\n**Boxplot of Top 15 States (2014–2017)** — A horizontal boxplot visualized the range of per-capita incident rates across all four years for the top 15 states, showing which states had consistent rates versus high year-to-year variability. This temporal stability check confirmed that the 2017 rankings were representative of broader trends, not single-year anomalies.",
        },
        {
          id: "city-level-analysis",
          title: "CITY-LEVEL ANALYSIS",
          content:
            "Having established the state-level landscape, the analysis drilled down to the city level to uncover more granular patterns. County-level Census data was joined with incident records on geoid, and the top 15 cities by raw incident count in 2017 were identified.\n\n**Incidents vs. Deaths Per Capita** — Two side-by-side bar charts compared the top 15 cities by incidents per 100K and deaths per 100K. A critical observation emerged: the rankings shifted significantly between the two metrics. **St. Louis, MO** stood out with a **36% lethality rate** — over a third of all gun violence incidents in St. Louis resulted in death in 2017. This was far above the average for other top-incident cities, signaling that something beyond incident frequency was driving death rates in certain urban centers.\n\n**Census Feature Engineering** — Three derived features were added to the city-level dataset to enrich the correlation analysis:\n\n• **rent_percentage**: proportion of median annual rent cost to median annual income\n• **home_percentage**: proportion of median annual mortgage cost to median annual income\n• **prop_deaths**: proportion of gun violence incidents producing a death\n\n**Correlation Matrices** — Custom correlation matrices were constructed using **ggcorrplot**, isolating features correlated with two distinct targets: incidents per 100K and deaths per 100K.\n\nFor **incidents per 100K**, the strongest signals came from population, deaths per 100K, and the proportion of deaths — essentially tautological relationships. A small signal emerged from gender demographics (lower male proportion correlating with slightly fewer incidents). Critically, **poverty showed near-zero correlation with incident rates**.\n\nFor **deaths per 100K**, a starkly different picture emerged. **Poverty showed moderate positive correlation with death rates**, and the derived cost-of-living scores (rent_percentage, home_percentage) mirrored this as functions of median income and poverty proportion. This divergence between the two correlation profiles became the central analytical thread.\n\n**Plotly Interactive Scatter Plots** — Two interactive scatter plots with custom HTML tooltips (city name, rate value, poverty proportion) and linear regression overlays made the poverty–lethality split visceral. The **incidents vs. poverty** plot showed a nearly flat regression line — poverty has almost no predictive power for whether gun violence occurs. The **deaths vs. poverty** plot showed a steep positive regression line — poverty strongly predicts whether those incidents are lethal. Four cities above 20% poverty threshold drove the relationship, motivating formal hypothesis testing.",
        },
        {
          id: "statistical-inference",
          title: "STATISTICAL INFERENCE",
          content:
            "The visual evidence demanded formal validation. The analysis proceeded through a rigorous three-stage inferential pipeline: parametric testing, non-parametric permutation testing, and bootstrap estimation.\n\n**Hypothesis** — Based on the observed correlation between poverty and death rates, a one-sided hypothesis was formulated:\n\n• H₀: μ_high ≤ μ_low (high-poverty cities have equal or lower death rates)\n• Hₐ: μ_high > μ_low (high-poverty cities have higher death rates)\n\nThe top 15 cities were divided into low and high poverty groups based on the median poverty proportion threshold. High-poverty cities had a mean death rate of 29.9 per 100K; low-poverty cities averaged 11.2 per 100K.\n\n**Assumption Checking** — Before parametric testing, both groups were assessed for normality via the **Shapiro-Wilk test**. Low-poverty cities: W = 0.89, **p = 0.22** (fail to reject normality). High-poverty cities: W = 0.86, **p = 0.16** (fail to reject normality). Both groups passed, though the small sample size (n = 15 total) warranted caution. Variance comparison revealed severe inequality: high-poverty variance = **485.5**, low-poverty variance = **15.8** — a ~30:1 ratio, violating the equal-variance assumption and necessitating Welch's correction.\n\n**Welch's t-test** — With unequal variances, a Welch's t-test was performed: **t = 2.22, df = 6.34, p = 0.033**. The p-value falls below the α = 0.05 threshold, providing statistically significant evidence that high-poverty cities experience higher gun violence death rates. The one-sided confidence interval for the mean difference started at 2.49 deaths per 100K.\n\n**Permutation Test** — To validate the parametric result without distributional assumptions, a **1,000-permutation Monte Carlo test** (seed = 1986) was conducted. In each permutation, the poverty-level labels were shuffled randomly among the 15 cities, and a Welch's t-statistic was computed. The observed t-statistic exceeded the permuted values in all but 11 of 1,000 permutations, yielding **p = 0.011** — stronger than the parametric result. A histogram of the null distribution with the observed t-statistic marked as a dashed vertical line showed it falling well into the rejection region, past the 95th percentile critical value.\n\n**Bootstrap Confidence Interval** — Finally, a **10,000-sample non-parametric bootstrap** estimated the sampling distribution of the median death rate in high-poverty cities. Resampling with replacement from the 7 high-poverty city observations produced a distribution of medians, with the 2.5th and 97.5th percentiles defining a **95% confidence interval of [11.6, 48.0] deaths per 100K**. This wide interval reflects the high variance within the high-poverty group but confirms that even the lower bound substantially exceeds the low-poverty group mean of 11.2.",
        },
        {
          id: "key-findings",
          title: "KEY FINDINGS",
          content:
            "**The Central Finding: Poverty Predicts Lethality, Not Incidence** — This is the most important result of the analysis. Poverty has near-zero correlation with whether gun violence occurs — but it has moderate positive correlation with whether people **die** from it. The scatter plots make the distinction stark: a flat regression line for incidents vs. poverty, a steep positive line for deaths vs. poverty. This finding, validated by three independent statistical tests (Welch's t-test p = 0.033, permutation p = 0.011, bootstrap CI [11.6, 48.0]), reframes how we think about the relationship between socioeconomic conditions and gun violence outcomes.\n\n**The Healthcare Infrastructure Hypothesis** — If poverty doesn't cause more gun violence but does cause more gun violence **deaths**, the mechanism is likely downstream of the incident itself. One plausible explanation: impoverished communities have fewer hospitals, poorer emergency medical infrastructure, and longer emergency response times. A gunshot wound that is survivable in a well-resourced city becomes lethal in a medically underserved one. This hypothesis — that poverty kills through healthcare deprivation rather than through violence generation — has direct policy implications for where to target intervention resources.\n\n**The Gun Ownership Paradox** — Many of the states with the deadliest cities had some of the lowest gun ownership rates in the country. Alaska (64.5% ownership) leads in per-capita incidents, but Delaware (34.4%) and Illinois (27.8%) also rank high despite low ownership. Meanwhile, states with high ownership rates don't necessarily appear in the top incident rankings. This inconsistency suggests that gun ownership rate alone is a poor predictor of gun violence, and that the relationship between access, ownership, and violence is far more nuanced than either side of the policy debate typically acknowledges.\n\n**Per-Capita Normalization Changes Everything** — Raw incident counts are one of the most misleading statistics in gun violence discourse. Illinois appears to have catastrophic gun violence — until you adjust for its 12.7 million population. Alaska and Delaware, rarely mentioned in gun violence conversations, emerge as the most incident-prone states per capita. DC, as a federal district functioning as a single city, is an extreme outlier that distorts any state-level comparison. The lesson: **always normalize by population before drawing conclusions.**\n\n**Personal Reflection** — The author is from **Baltimore, Maryland** — the 2nd deadliest city in the 2017 data. This personal connection adds authentic perspective: the statistics are not abstract. The analysis concludes with a call for more careful research and targeted interventions, arguing that treating gun violence deaths as the output variable (rather than addressing the input conditions — poverty, healthcare access, community infrastructure) perpetuates the cycle rather than breaking it.",
        },
      ],
      keyMetrics: [
        { label: "INCIDENTS ANALYZED", value: "~239K" },
        { label: "GEOID RECOVERY", value: "99.8%" },
        { label: "WELCH'S T-TEST", value: "p = 0.033" },
        { label: "PERMUTATION TEST", value: "p = 0.011" },
        { label: "BOOTSTRAP CI", value: "[11.6, 48.0]" },
        { label: "ST. LOUIS LETHALITY", value: "36%" },
      ],
      team: ["Steve Meadows"],
      course: "STA 418/518 — Intro to Statistics",
      timeline: "Summer 2024",
    },
  },
  {
    slug: "order-history-dfa",
    title: "ORDER HISTORY DFA",
    subtitle: "Multivariate Time Series Dimensionality Reduction",
    category: "stats",
    tags: [
      "Time Series",
      "DFA",
      "Forecasting",
      "State-Space Models",
      "MARSS",
      "Dimensionality Reduction",
      "Promax Rotation",
      "AICc",
    ],
    description:
      "Applied Dynamic Factor Analysis via MARSS state-space modeling to reduce 39 multivariate time series variables into 6 interpretable latent trends explaining 55% of variance — then validated with a public dataset showing 11% MAE improvement over raw features.",
    longDescription:
      "During a data science internship at a durable goods manufacturer, applied Dynamic Factor Analysis (DFA) to a multivariate time series forecasting problem — recognizing that standard PCA/PAF fails on temporal data. Used the MARSS package in R to fit linear dynamical systems via Expectation-Maximization and BFGS optimization, reducing ~39 internal and external economic variables to 6 interpretable latent trends that explained 55% of total variance. Promax oblique rotation yielded factors mapping to real economic constructs (unemployment, commercial real estate, business sentiment, monetary policy, industry demand, professional construction). A companion Kaggle notebook validated the approach on public data, demonstrating 11% lower MAE and 3% lower RMSE when using DFA trends instead of raw features.",
    techStack: [
      "R",
      "MARSS",
      "psych",
      "GPArotation",
      "tseries",
      "doParallel",
      "foreach",
      "ggplot2",
      "dplyr",
      "tidyr",
      "reshape2",
      "Python",
      "pandas",
      "statsforecast",
      "matplotlib",
    ],
    image: "/projects/order-dfa.png",
    github:
      "https://www.kaggle.com/code/stevemeadows/dfa-performance-comparison",
    liveDemo:
      "https://www.kaggle.com/code/stevemeadows/dfa-performance-comparison",
    featured: true,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "During a data science internship at a durable goods manufacturer, the goal was to build a statistical model forecasting monthly order volume. The model incorporated **~39 time series variables** — a mix of internal pipeline metrics and external economic indicators spanning unemployment, commercial real estate, business sentiment, monetary policy, industry-specific demand, and professional construction indices.\n\nInspired by graduate coursework in multivariate statistics, the initial approach explored applying Principal Component Analysis (PCA) and Principal Axis Factoring (PAF) to reduce the dimensionality of the feature space. However, PCA and PAF assume **static, non-temporal data** — they extract latent factors from a covariance matrix computed across independent observations, which fundamentally breaks down when observations are autocorrelated time series. The extracted components would conflate temporal dynamics with cross-sectional variance, producing misleading and unstable factors.\n\nThe solution was **Dynamic Factor Analysis (DFA)**, a state-space modeling approach designed explicitly for multivariate time series. DFA models the observed data as generated by a smaller set of latent dynamic factors that evolve over time according to a stochastic process — specifically, a linear dynamical system. This allows DFA to capture temporal dependencies while simultaneously reducing dimensionality, yielding interpretable latent trends rather than static components.\n\nImplementation used the **MARSS** (Multivariate Autoregressive State-Space) package in R, which provides robust tools for fitting these models via Expectation-Maximization and BFGS optimization. After careful model selection based on AICc criteria, the analysis settled on **6 latent trends explaining 55% of the variance** across the full variable set, with Promax oblique rotation producing interpretable factors that mapped intuitively to real economic constructs.\n\nDue to the proprietary nature of the internship data, a **companion Kaggle notebook** was created to demonstrate the DFA approach on a public dataset (Bike Sales Data of 100K), validating that the dimensionality reduction produces **equal or better prediction accuracy** with dramatically fewer features.",
        },
        {
          id: "data-preparation",
          title: "DATA PREPARATION",
          content:
            "The dataset comprised **39 time series variables** spanning internal order pipeline metrics and external economic indicators. Preparing this data for MARSS required a rigorous multi-step stationarity pipeline:\n\n**Stationarity Testing** — Each variable was tested using both the **Augmented Dickey-Fuller (ADF)** test (null: unit root present) and the **KPSS** test (null: series is stationary). Using both tests in tandem provided robust classification, flagging variables where ADF p > 0.05 or KPSS p < 0.05 as non-stationary.\n\n**First Differencing** — Non-stationary series were first-differenced to remove trends. After differencing, stationarity was re-tested on all variables.\n\n**Second Differencing** — Variables that remained non-stationary after first differencing received a second round of differencing, with stationarity re-confirmed via ADF and KPSS.\n\n**Variance Thresholding** — After differencing, a variance cutoff (1e-3) was applied to remove near-zero-variance columns that would provide no useful signal to the model.\n\n**Special Handling of the Federal Funds Rate** — The federal funds rate exhibited unique behavior as a level variable managed by policy decisions rather than market forces. Rather than differencing it (which destroyed its interpretive value), it was removed from the differencing pipeline, tested separately for stationarity, and reattached to the processed dataset as a raw level variable aligned to the differenced time indices.\n\n**Redundant Variable Consolidation** — Iterative analysis revealed several groups of highly correlated variables that inflated factor loadings. Return-to-office metropolitan indices were consolidated to a single representative variable, multiple industry stock prices were consolidated, and sparse variables (e.g., infrequent price-change data) were removed entirely.\n\n**Z-Score Standardization** — The MARSS package requires all input series to be z-scored (zero mean, unit variance), ensuring that variables with different scales contribute equally to the factor estimation. The standardized data matrix was then transposed to MARSS's expected format (series in rows, time points in columns).",
        },
        {
          id: "modeling",
          title: "MODELING",
          content:
            "The core of the analysis used the **MARSS state-space framework**, which models the data through two coupled equations:\n\n• **Observation equation:** y(t) = Z·x(t) + a + v(t) — the observed variables y are linear combinations of latent states x, plus offsets a and observation noise v\n• **State equation:** x(t) = B·x(t-1) + u + w(t) — the latent states evolve as a random walk with drift u and process noise w\n\nThe model was configured with **diagonal and unequal** observation and process error covariance matrices (R and Q), zero intercepts (A = \"zero\"), identity state transition (B = \"identity\" for random walk dynamics), and high initial state uncertainty (V0 = diag(10, m)).\n\n**BFGS Optimization** — Model fitting used the BFGS quasi-Newton method with stringent convergence criteria: maximum 10,000 iterations and a relative tolerance of 1e-8. This provided more reliable convergence than the default EM algorithm for models with many parameters.\n\n**Model Selection** — Models were fitted across **m = 1 to 12 latent trends**, with each model's fit evaluated via **AICc** (corrected Akaike Information Criterion), which penalizes model complexity to prevent overfitting. The AICc plot indicated that 3–8 trends represented the optimal range, with diminishing returns beyond 6.\n\n**Iterative Refinement** — The modeling process was iterative rather than single-pass:\n\n• **Initial run** (all variables, m = 1–12): Identified m = 6 as optimal by AICc, but Promax rotation revealed only 38% variance explained with overloaded return-to-office factors\n• **RTO consolidation** (reduced correlated variables): Re-ran m = 4–6, found m = 4 optimal by AICc but showed signs of overfitting in loadings\n• **Final selection** (m = 6 after consolidation): Achieved 55% variance explained with balanced, interpretable factor loadings distributed across three dominant trends\n\n**Parallel Computing** — The `doParallel` and `foreach` packages enabled parallelized model fitting across multiple trend counts, distributing MARSS fits across all available CPU cores to reduce total computation time across the model selection grid.",
        },
        {
          id: "factor-interpretation",
          title: "FACTOR INTERPRETATION",
          content:
            "After fitting the m = 6 model, the raw loadings matrix was rotated to improve interpretability.\n\n**Promax Oblique Rotation** — Unlike Varimax (orthogonal), Promax allows factors to be correlated, which is more realistic for economic time series where underlying forces often co-move. The Promax-rotated loadings matrix was computed using the `psych` and `GPArotation` packages, producing six interpretable trends:\n\n• **Trend 1 — Unemployment dynamics** (6.1% variance): Loaded most heavily on labor market indicators, tracking closely with the unemployment rate\n• **Trend 2 — Commercial real estate activity** (1.0% variance): Captured office leasing and commercial property dynamics\n• **Trend 3 — Business and consumer sentiment** (16.5% variance): The dominant trend, driven by CEO confidence indices and consumer sentiment measures — a \"vibes\" factor capturing the overall economic mood\n• **Trend 4 — Monetary policy** (13.6% variance): Tracked the federal funds rate and interest rate environment, capturing central bank policy impacts on the industry\n• **Trend 5 — Industry-specific demand indicators** (4.4% variance): Loaded on sector-specific demand metrics and trade association indices\n• **Trend 6 — Professional construction activity** (3.1% variance): Captured professional and institutional construction spending, a leading indicator for durable goods demand\n\n**Trend Overlay Validation** — Each Promax-rotated trend was plotted overlaid with its highest-loading observed variable. In every case, the latent trend tracked its corresponding economic indicator closely, providing visual confirmation that the factors captured genuine economic dynamics rather than statistical artifacts.\n\n**Correlation Heatmap** — The correlation matrix of the six Promax-rotated trends was computed and visualized as a heatmap. The trends exhibited **near-independence**, confirming that each factor captured a distinct economic dimension — exactly the desirable property for dimensionality reduction where each trend should represent a different underlying force.",
        },
        {
          id: "prediction-validation",
          title: "PREDICTION VALIDATION",
          content:
            "To demonstrate the practical value of DFA dimensionality reduction without exposing proprietary data, a **companion Kaggle notebook** was created using the publicly available Bike Sales Data of 100K dataset — chosen for its matching monthly time interval and durable goods domain.\n\nThe validation compared two prediction approaches using the **statsforecast** library in Python:\n\n**Setup** — The 6 Promax-rotated DFA trends (extracted from the proprietary analysis) were joined with monthly aggregated bike sales data. The dataset was split into 21 training months and 6 test months, with both DFA trends and raw variables tested as exogenous inputs to the same forecasting models.\n\n**MFLES Model (Multi-Frequency Locally Estimated Scatterplot Smoothing):**\n• Using 6 DFA trends: **MAE = 719,515 | RMSE = 866,562**\n• Using 41 raw variables: **MAE = 798,884 | RMSE = 892,382**\n• **Result: 11% lower MAE and 3% lower RMSE with DFA trends**\n\n**MSTL Model (Multiple Seasonal-Trend decomposition using LOESS):**\n• Using 6 DFA trends: **MAE = 741,814 | RMSE = 819,393**\n• Using 41 raw variables: **MAE = 741,814 | RMSE = 819,393**\n• **Result: Identical performance** — MSTL relies primarily on seasonal decomposition, so exogenous variables had less influence\n\nThe key finding: **6 DFA trends produced equal or better predictions than 41 raw variables**, while offering dramatically simpler inputs. The MFLES model — which more heavily leverages exogenous variables — showed a clear advantage for DFA trends, likely because the latent trends filtered noise from the raw features and captured the underlying economic signal more cleanly.",
        },
        {
          id: "key-takeaways",
          title: "KEY TAKEAWAYS",
          content:
            "**DFA as an underutilized tool** — Dynamic Factor Analysis occupies a unique niche in the data science toolkit: it is specifically designed for the intersection of dimensionality reduction and time series analysis where standard PCA/PAF methods fail. Despite its power, DFA is rarely encountered in applied data science, making it a valuable differentiator.\n\n**The efficiency argument** — Reducing 39 variables to 6 trends means simpler models, faster training, easier interpretability, and lower risk of overfitting. For production forecasting systems where model retraining occurs regularly, this efficiency compounds over time.\n\n**The accuracy argument** — The Kaggle validation demonstrated that latent trends can **outperform raw features** by removing noise and capturing the true underlying economic signal. The 11% MAE improvement with MFLES suggests that DFA trends are not just a compression convenience but can genuinely improve predictive power.\n\n**Practical applicability** — The methodology generalizes to any domain with multivariate time series: finance, healthcare, supply chain, energy, climate science. Any forecasting problem where numerous correlated time series drive an outcome is a candidate for DFA.\n\n**Dual-language pipeline** — The project demonstrated a cross-language data science workflow: R (MARSS, psych, GPArotation) for the statistical modeling where R's ecosystem excels, and Python (pandas, statsforecast, matplotlib) for the prediction comparison where Python's forecasting libraries are stronger. This pragmatic language choice — using each tool where it is strongest — reflects the reality of applied data science work.",
        },
      ],
      keyMetrics: [
        { label: "INPUT VARIABLES", value: "39" },
        { label: "LATENT TRENDS", value: "6" },
        { label: "VARIANCE EXPLAINED", value: "55%" },
        { label: "MAE IMPROVEMENT", value: "11%" },
        { label: "RMSE IMPROVEMENT", value: "3%" },
        { label: "MODELS TESTED", value: "m=1–12" },
      ],
      team: ["Steve Meadows"],
      timeline: "2024–2025",
    },
  },
  {
    slug: "bjj-adcc-analysis",
    title: "BJJ ADCC ANALYSIS",
    subtitle: "Competition Analytics",
    category: "stats",
    tags: [
      "Sports Analytics",
      "Tableau",
      "Data Visualization",
      "Competition Data",
      "Interactive Dashboards",
    ],
    description:
      "Interactive Tableau dashboard analyzing ADCC submission grappling championships — uncovering dominant submissions, the rise of leg locks, weight class dynamics, and the counterintuitive finding that fighter specialization outperforms versatility.",
    longDescription:
      "Built a multi-view interactive Tableau dashboard analyzing the Abu Dhabi Combat Club (ADCC) submission grappling tournaments — the pinnacle of competitive Brazilian Jiu Jitsu. Using two publicly available Kaggle datasets (historical match data and fighter statistics), the project identifies the most effective submissions across weight classes, tracks the rise of leg locks over time via regression analysis, and explores performance patterns through filterable visualizations. Key finding: a small handful of submissions dominate competition victories, and fighters with narrower submission repertoires tend to outperform those with broader ones — specialization beats versatility at the highest level.",
    techStack: ["Tableau", "Python", "Pandas", "Excel"],
    image: "/projects/bjj-adcc.png",
    liveDemo:
      "https://public.tableau.com/app/profile/anthony.meadows/viz/241110_final_project_submissions_dashboard_BACKUP/Dashboard1",
    liveDemoLabel: "View on Tableau Public",
    featured: false,
    detail: {
      sections: [
        {
          id: "overview",
          title: "OVERVIEW",
          content:
            "Brazilian Jiu Jitsu (BJJ) is a grappling martial art emphasizing submissions over strikes, and its competitive scene has grown globally — with the **Abu Dhabi Combat Club (ADCC)** tournament standing as its pinnacle. For athletes and coaches, identifying trends in techniques and understanding performance metrics are crucial for achieving success at the highest level.\n\nThis project leverages **data visualization** to analyze BJJ competition data. Using two publicly available datasets from Kaggle, the dashboard visualizes submission trends, performance metrics, and global participation. The project focuses on answering key research questions that benefit competitive practitioners and coaches:\n\n• What are the most effective submissions across weight classes and time periods?\n• How have performance trends evolved — win rates, match outcomes, and fighter success metrics?\n• What is the relationship between submission specialization and competitive success?",
        },
        {
          id: "data-sources",
          title: "DATA SOURCES",
          content:
            "Two datasets from Kaggle were utilized for the analysis:\n\n**ADCC Historical Dataset** — Match-level data including submissions, outcomes, timelines, weight classes, and competition years. This forms the backbone of the submission analysis, enabling breakdowns by year, sex, and weight division.\n\n**ADCC Fighter Stats** — Detailed fighter-level statistics including weight class, win rates, submission repertoire, and career performance metrics. This dataset powers the fighter performance analysis and the specialization vs. versatility investigation.",
        },
        {
          id: "submission-analysis",
          title: "SUBMISSION ANALYSIS",
          content:
            "The core dashboard centers on understanding which submissions actually win matches at the highest level of competition.\n\n**Submission Proportions (Pie Chart)** — A color-coded pie chart displays the total proportion of submissions that successfully led to victories across ADCC history. Ordered in descending proportion going counter-clockwise, with annotated labels highlighting dominant techniques. This visualization allows coaches and fighters to immediately identify high-percentage techniques that consistently lead to success — and compare the relative frequency of different submission types to inform training strategy.\n\n**Submissions Per Year (Bar Chart)** — A horizontal bar chart provides a more granular view by aggregating the count of each submission within specific competition years. The horizontal orientation optimizes space and improves readability for long submission names, enabling users to explore year-to-year variations and identify patterns in technique usage across competition periods.\n\n**Submission Categories By Year (Stacked Bar Chart)** — Submissions are grouped into four strategic categories — **Chokes**, **Leg Submissions**, **Arm Locks**, and **Other** — and displayed as a color-coded stacked bar chart per competition year. This generalized view helps practitioners and coaches streamline their approach, focusing offensive or defensive strategy based on the relative prominence of different submission types over time.",
        },
        {
          id: "trend-analysis",
          title: "RISE OF LEG LOCKS",
          content:
            "In the early days of competitive Jiu Jitsu, leg submissions were relatively uncommon. Over the years, the game has evolved significantly — and effective coaches and practitioners now emphasize the importance of a well-balanced attack strategy targeting both the upper and lower body.\n\n**Connected Dot Plot with Regression** — To visually highlight this trend, a connected dot plot displays the sum of leg submissions for each ADCC competition year, overlaid with a **regression line** that makes the upward trajectory unmistakable. This allows users to extrapolate the trend, underscoring the increasing imperative of being able to both **attack and defend** leg submissions in the modern era of Jiu Jitsu.\n\nThis visualization is the one element of the dashboard that remains static (not affected by filters), serving as a persistent strategic reference point — the rise of leg locks is a macro trend that transcends individual weight classes or competition years.",
        },
        {
          id: "interactive-features",
          title: "INTERACTIVE DASHBOARD",
          content:
            "With the exception of the leg lock trend plot, the entire dashboard is designed to be interactive, responding to filter selections that allow users to customize their analysis.\n\n**Sex Filter** — Toggle between male and female fighters. This dynamically updates the proportions in the pie chart, the counts in the submissions-per-year bar chart, and the category breakdowns to reflect the selected subset.\n\n**Year Filter** — Select a specific competition year to focus the analysis on the most relevant period. All submission charts update to reflect only the chosen year's data.\n\n**Weight Class Filter** — Weight plays a crucial role in how matches are strategized and won. Coaches and fighters can tailor their analysis to their specific weight division, developing strategies based on trends within their competitive bracket.\n\nThese filters provide a highly flexible experience — whether analyzing overall historical trends or drilling down into specific demographic and competitive subsets, the dashboard equips users with the granularity needed for informed decision-making.",
        },
        {
          id: "key-insights",
          title: "KEY INSIGHTS",
          content:
            "As a practitioner, this analysis provided several meaningful insights into the competitive landscape of Brazilian Jiu Jitsu.\n\n**The Dominance of Few** — The data revealed that a small handful of submissions dominate the competition in any given year, taking the lion's share of victories. This challenges the common perception that mastering a wide array of techniques is essential for success.\n\n**Specialization Beats Versatility** — In a supplementary analysis (not featured in the main dashboard), fighter performance was standardized using **z-score normalization** of submission win ratios and compared against the diversity of each fighter's submission repertoire. A counterintuitive trend emerged: **as the number of unique submission types decreased, fighter success increased.** The most successful fighters come prepared with a focused game plan and execute it with precision.\n\nThis insight aligns with Bruce Lee's famous words: *\"I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.\"* At the highest levels of competition, mastery and specialization clearly outperform breadth.\n\n**The Leg Lock Revolution** — The regression analysis confirms what modern practitioners already feel on the mats: leg submissions are no longer optional. The upward trend demands that both offensive and defensive leg lock proficiency be core components of any serious competitor's game.",
        },
        {
          id: "conclusion",
          title: "CONCLUSION",
          content:
            "This project bridges the gap between data and strategy in Brazilian Jiu Jitsu. For practitioners, the dashboard offers actionable insights to refine training, focus on high-percentage techniques, and better prepare for competition. For coaches, it simplifies the process of analyzing performance trends and provides the evidence needed to develop effective training regimens.\n\nFuture work could expand this analysis by incorporating additional datasets — such as detailed match sequences or real-time performance data — and exploring machine learning models to predict outcomes based on historical trends. By continuing to integrate visualization and analytics into combat sports, we can unlock new levels of understanding and success for athletes at all levels.",
        },
      ],
      keyMetrics: [
        { label: "DATASETS", value: "2" },
        { label: "DASHBOARDS", value: "3" },
        { label: "FILTERS", value: "3" },
        { label: "SUB TYPES", value: "25+" },
        { label: "WEIGHT CLASSES", value: "8" },
        { label: "COMP YEARS", value: "13" },
      ],
      embeds: [
        {
          title: "Submissions by Weight Class",
          url: "https://public.tableau.com/views/241110_final_project_submissions_dashboard_BACKUP/Dashboard1?:embed=true&:display_count=n&:showVizHome=no",
        },
        {
          title: "Performance Metrics",
          url: "https://public.tableau.com/views/241110_final_project_submissions_dashboard_BACKUP/Dashboard2?:embed=true&:display_count=n&:showVizHome=no",
        },
        {
          title: "Fighter Analysis",
          url: "https://public.tableau.com/views/241110_final_project_submissions_dashboard_BACKUP/Dashboard3?:embed=true&:display_count=n&:showVizHome=no",
        },
      ],
      team: ["Steve Meadows"],
      course: "STA 671 — Data Visualization",
      timeline: "Fall 2024",
    },
  },
];

/** Get projects filtered by category */
export function getProjectsByCategory(
  category: ProjectCategory | "all"
): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

/** Get a single project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Get adjacent projects for prev/next navigation */
export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}

/** Get featured projects */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Generate static params for all project slugs (for SSG) */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Total project count */
export const totalProjectCount = projects.length;
