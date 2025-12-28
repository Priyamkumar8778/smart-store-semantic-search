# smart-store-semantic-search
Build a semantic inventory search system using embedding and rule based filters.

## 🔹 Project Overview (Brief)

This project is a **smart inventory search system for shop owners**.
It allows users to search products using **natural language** instead of exact keywords.

The system understands **meaning**, applies **price and category filters**, and returns the **most relevant items**.

Example queries:

* *“give stationery items under 10 rs”*
* *“cheap items for students”*
* *“only fruit items”*
  

## 🔹 What Problem Does This Project Solve?

Traditional search systems require **exact keywords**:

* If the item name doesn’t match, results fail.

This project solves that by using **Semantic Search**, which understands **intent and meaning**.


## 🔹 What is Semantic Search?

**Semantic search** retrieves results based on the **meaning of the query**, not just matching words.

Instead of asking:

> “Does this text contain the same word?”

It asks:

> “Does this text mean the same thing?”



## 🔹 Keyword Search vs Semantic Search (With Example)

### ❌ Keyword Search

**Query:**

> “stationery items”

**Fails to match:**

* “pen”
* “pencil”
* “writing tools”

Because the word *stationery* is not present.

---

### ✅ Semantic Search (This Project)

**Query:**

> “stationery items”

**Correctly matches:**

* pen
* pencil
* eraser

Because the **meaning is similar**, even if the words are different.

---

## 🔹 What are Embeddings?

**Embeddings** are numerical representations of text that capture its meaning.

* Every item description is converted into a vector (array of numbers).
* User queries are also converted into vectors.
* Similar meanings → vectors closer together.

Example (simplified):

```
"pen"     → [0.21, 0.88, 0.14]
"pencil" → [0.22, 0.86, 0.15]
"apple"  → [0.91, 0.03, 0.77]
```

Pen and pencil are closer → higher relevance.

---

## 🔹 What is the Similarity Score?

The **score** represents how close the query meaning is to an item.

* Higher score → more relevant
* Lower score → less relevant

The project uses **cosine similarity** to calculate this score.

Example:

```
pen      → score 0.62
pencil  → score 0.60
apple   → score 0.18
```

Items are sorted by score before returning results.

---

## 🔹 How Price and Category Filters Are Applied

Semantic search alone **ranks** results but does not **exclude** items.

To solve this, the project combines:

* **AI (semantic understanding)**
* **Logical filters (price & reminder)**

### Example:

**Query:**

> “only stationery items under 10 rs”

### Steps:

1. Extract price → `10`
2. Extract category → `stationery`
3. Filter database:

   * category = stationery
   * price ≤ 10
4. Rank remaining items using embeddings

This ensures **correct + meaningful results**.

---

## 🔹 Example Output

**Query:**

> “only stationery items under 10 rs”

**Result:**

```json
[
  { "name": "pen", "price": 5 },
  { "name": "pencil", "price": 10 }
]
```

No fruits or unrelated items are returned.

---

## 🔹 Tech Stack

* Node.js
* Express.js
* MongoDB
* Google GenAI (Embeddings)
* HTML + JavaScript (Frontend)

---

## 🔹 Why This Project Is Important

* Demonstrates **real-world AI usage**
* Shows how **AI + logic work together**
* Foundation for **RAG systems**
* Scalable to production-level applications

---

## 🚀 Coming Soon: RAG-Based Shop Chatbot

Next, I will extend this project into a **RAG (Retrieval-Augmented Generation) chatbot**.

### What will change?

Instead of returning only lists:

**Before (Semantic Search):**

```json
[
  { "name": "pen", "price": 5 },
  { "name": "pencil", "price": 10 }
]
```

**After (RAG Chatbot):**

> “You can buy a pen for 5 rupees and a pencil for 10 rupees. These are affordable stationery items suitable for students.”

### New Capabilities:

* Conversational answers
* Natural explanations
* Better user experience
* Reduced hallucination using shop data
