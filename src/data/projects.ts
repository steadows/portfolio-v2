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

/** Full detail content for the project detail page */
export interface ProjectDetail {
  /** Narrative sections (Problem → Approach → Results, etc.) */
  sections: ProjectSection[];
  /** Key stats shown in a metrics panel */
  keyMetrics: KeyMetric[];
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
    tags: ["Gemini LLM", "Serverless", "GCP", "Telegram Bot", "Firestore"],
    description:
      "Serverless weekly meal planner powered by Google Gemini with a Gordon Ramsay persona. Generates dinner options, handles selections via Telegram, and produces aisle-grouped grocery lists.",
    longDescription:
      "A production-deployed serverless application that generates three weekly dinner options using Google Gemini's LLM (with a Gordon Ramsay persona), delivered through an interactive Telegram bot. Users select meals via inline keyboard buttons or conversational text, and the system generates aisle-grouped grocery lists. Features include meal history tracking, favorites, feedback collection, conversational AI with memory of past meals and preferences, and on-demand recipe generation. Built on Google Cloud Platform with Cloud Functions (2nd Gen), Firestore for persistent storage, Cloud Scheduler for weekly automation, and Secret Manager for credentials. Uses the RISEN prompting framework for structured LLM interactions.",
    techStack: [
      "Python",
      "Google Gemini",
      "GCP Cloud Functions",
      "Firestore",
      "Telegram Bot API",
      "Cloud Scheduler",
      "Flask",
    ],
    image: "/projects/dinnerbot.png",
    github: "https://github.com/steadows/dinnerbot",
    featured: true,
  },

  // ─── Statistics (Medium Priority) ──────────────────────────────────────────
  {
    slug: "laplace-distribution",
    title: "LAPLACE DISTRIBUTION",
    subtitle: "Interactive Statistical Explorer",
    category: "stats",
    tags: ["Probability", "Interactive", "Shiny", "Simulation"],
    description:
      "Interactive R Shiny application for exploring the Laplace (Double Exponential) distribution — featuring PDF/CDF visualization, random sampling simulation, and real-world case studies.",
    longDescription:
      "Built a comprehensive interactive web application for exploring the Laplace distribution. Features include adjustable location and scale parameters with real-time PDF/CDF visualization, Normal distribution overlay comparison highlighting heavy tails, probability and quantile calculators, random sampling with convergence demonstration, and curated case studies spanning finance (Black Swan modeling), machine learning (LASSO sparsity), and differential privacy (Laplace Mechanism).",
    techStack: ["R", "Shiny", "ggplot2", "shinydashboard"],
    image: "/projects/laplace-distribution.png",
    liveDemo: "https://ll7bfl-steve-meadows.shinyapps.io/project_1/",
    featured: true,
  },
  {
    slug: "gun-violence-geospatial",
    title: "GUN VIOLENCE ANALYSIS",
    subtitle: "Geospatial Intelligence",
    category: "stats",
    tags: ["Geospatial", "Visualization", "Statistical Modeling", "Public Policy"],
    description:
      "Comprehensive geospatial analysis of gun violence patterns across the United States, revealing regional trends and socioeconomic correlations.",
    longDescription:
      "Conducted a thorough geospatial analysis of gun violence incidents across the U.S., combining spatial statistics with socioeconomic indicators. Built interactive visualizations revealing temporal patterns, geographic clustering, and demographic correlations to inform data-driven policy discussion.",
    techStack: ["R", "ggplot2", "sf", "leaflet", "tidyverse"],
    image: "/projects/gun-violence.png",
    github: "https://github.com/steadows",
    liveDemo: "https://steadows.github.io/240612_meadoant_final_project.html",
    featured: true,
  },
  {
    slug: "order-history-dfa",
    title: "ORDER HISTORY DFA",
    subtitle: "Time Series Analysis",
    category: "stats",
    tags: ["Time Series", "DFA", "Forecasting", "Pattern Recognition"],
    description:
      "Applied Dynamic Factor Analysis to order history time series data, uncovering long-range correlations and scaling behaviors in purchasing patterns.",
    longDescription:
      "Implemented Dynamic Factor Analysis (DFA) on e-commerce order history data to identify long-range temporal correlations and fractal scaling properties. The analysis revealed hidden patterns in consumer purchasing behavior that traditional time series methods often miss.",
    techStack: ["Python", "NumPy", "Pandas", "Matplotlib", "SciPy"],
    image: "/projects/order-dfa.png",
    github: "https://github.com/steadows",
    featured: false,
  },
  {
    slug: "bjj-adcc-analysis",
    title: "BJJ ADCC ANALYSIS",
    subtitle: "Competition Analytics",
    category: "stats",
    tags: ["Sports Analytics", "Tableau", "Visualization", "Competition Data"],
    description:
      "Data-driven analysis of ADCC submission grappling championships using Tableau, uncovering winning strategies, submission patterns, and competitive trends.",
    longDescription:
      "Created an interactive Tableau dashboard analyzing ADCC submission grappling competition data across multiple years. Identified trends in winning techniques, weight class dynamics, competitor performance trajectories, and strategic patterns that differentiate champions.",
    techStack: ["Tableau", "Python", "Pandas", "Excel"],
    image: "/projects/bjj-adcc.png",
    liveDemo: "https://public.tableau.com",
    featured: false,
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
