# Taikun Cloud Documentation

This repository hosts the documentation for [Taikun Cloud](https://docs.taikun.cloud/), built using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## 📘 Overview

Taikun Cloud is a cloud management platform that enables organizations to streamline the deployment and lifecycle management of Kubernetes clusters across multiple infrastructures.

This documentation provides detailed information for users and administrators to effectively use and manage Taikun Cloud, including:

- Account and project setup
- User roles and permissions
- Cluster provisioning
- Monitoring and cost management
- API usage
- Troubleshooting and FAQs

## 🚀 Getting Started Locally

To view the documentation locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-org/taikun-docs.git
cd taikun-docs
```

### 2. Create a virtual environment (optional but recommended)

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the local server

```bash
mkdocs serve
```

Then visit `http://localhost:8000` in your browser.

## ⚙️ Building the Documentation

To build the static site:

```bash
mkdocs build
```

The static site will be created in the `site/` directory.

## 📁 Structure

```
.
├── docs/                  # Markdown source files
├── mkdocs.yml             # MkDocs configuration file
└── README.md              # This file
```

## ✏️ Contributing

If you'd like to contribute to the documentation, please fork the repository and open a pull request with your changes. For major changes, open an issue first to discuss what you would like to change.

## 📄 License

This documentation is licensed under the MIT License.

---

> Maintained by the Taikun Cloud team — [https://taikun.cloud](https://taikun.cloud)
