# 💙 Mini Health Tracker

A simple React Native mobile app that helps users monitor their health by selecting symptoms and receiving basic health advice.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your phone (iOS or Android)

### Installation

```bash
# 1. Navigate to the project folder
cd MiniHealthTracker

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

Then scan the QR code with **Expo Go** (Android) or your iPhone Camera (iOS).

---

## 📁 Project Structure

```
MiniHealthTracker/
├── App.js                        # Entry point, navigation setup
├── package.json                  # Dependencies
│
├── logic/
│   └── healthAnalyzer.js         # Rule-based symptom analysis engine
│
├── components/
│   ├── SymptomCard.js            # Selectable symptom card component
│   └── Header.js                 # Reusable screen header
│
└── screens/
    ├── HomeScreen.js             # Landing / welcome screen
    ├── SymptomSelectionScreen.js # Symptom selection screen
    └── ResultScreen.js           # Results & advice screen
```

---

## 🧠 How the Logic Works

The `healthAnalyzer.js` file contains a rule-based engine:

1. It receives an array of selected symptom IDs (e.g., `['fever', 'fatigue']`)
2. It evaluates conditions in priority order (most urgent first)
3. It returns a structured result: `{ condition, advice, severity, tips }`

### Severity Levels
| Level    | Color  | Example Condition         |
|----------|--------|---------------------------|
| Low      | Green  | Common cold, mild cough   |
| Moderate | Yellow | Fever, flu-like illness   |
| High     | Red    | Multiple combined symptoms|
| Urgent   | Dark   | Chest pain + dizziness    |

---

## 📱 App Screens

| Screen | Route Name | Description |
|--------|-----------|-------------|
| Home | `Home` | Welcome screen with feature overview |
| Symptom Selection | `SymptomSelection` | Select symptoms dynamically |
| Result | `Result` | Displays analysis, advice, and tips |

---

## ⚙️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| React Native | Mobile UI framework |
| Expo | Development toolchain |
| React Navigation (Native Stack) | Multi-screen navigation |
| React Hooks (`useState`) | State management |

---

## 🔮 Possible Future Improvements

- 💾 **Local Storage** — Save symptom history using `AsyncStorage`
- 🌐 **Medical APIs** — Integrate real health databases
- 👤 **User Profiles** — Personal health tracking over time
- 🤖 **AI Diagnosis** — Replace rule-based logic with an ML model
- 🌍 **Multilingual** — Support for French, Arabic, Wolof, etc.

---

## ⚕️ Disclaimer

This application is for **educational and informational purposes only**. It does not provide medical diagnoses and should not replace professional medical advice.

---

*Built with React Native · Expo · React Navigation*
