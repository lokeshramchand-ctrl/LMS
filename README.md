# **📚 Learning Management System (LMS) - Final ReadMe**  

## 🚀 **Project Overview**  
The **Learning Management System (LMS)** is a **feature-rich** web platform that provides a **seamless learning experience** for students and teachers. It integrates **modern AI, video conferencing, authentication, and course management** into one **robust** solution.

## 🛠 **Tech Stack**
- **Frontend:** React  
- **Backend:** Django (Python)  
- **Database:** MySQL / PostgreSQL  
- **Authentication:** Username/Password, Face Recognition  
- **AI Features:** Chatbot for instant student support  (Gemini API)
- **Video Conferencing:** Jitsi Meet API Integration  

---

## **🌟 Features**
### 🔐 **Authentication**
✅ **Face Recognition Login** – Users can log in using **face authentication**  
✅ **Username/Password Login** – Standard authentication with **hashed passwords**  
✅ **Secure User Session Management**  

### 📚 **Course Management**
✅ **Add, Edit, Delete Courses** – Teachers can **manage** their courses  
✅ **Enroll in Courses** – Students can **enroll** in available courses  
✅ **Submit Assignments** – Students can **upload** their assignments  
✅ **Track Course Progress** – System **tracks progress** per user  

### 🎦 **Video Conferencing**
✅ **Integrated Jitsi Meet API** – Live **video lectures** directly within LMS  
✅ **Auto-Generated Meeting Links** – Unique **meeting ID** created for each session  
✅ **Embedded Video Meetings** – Conduct **classes within the LMS**  

### 🤖 **GEMINI AI Chatbot**
✅ **24/7 Student Support** – AI chatbot helps students with queries  
✅ **Smart Answers** – AI suggests **courses, assignments, and deadlines**  
✅ **Natural Language Processing (NLP)**  

### Yet to implement features 
### 🏆 **Gamification (Future Scope)**
✅ **Points & Badges** for course completion  
✅ **Leaderboard System** for student rankings 

### 📊 **Dashboard & Analytics**
✅ **Bento Box UI** – Beautiful dashboard layout  
✅ **Course Statistics** – Number of enrolled students, assignment submissions   

### 🔄 **User Profile & Settings**
✅ **Edit Profile Information**  
✅ **Change Password & Security Settings**  
✅ **Personalized Theme & Notifications**  
✅ **Multi-Role Authetication** 


---

## **📂 Project Structure**
```
📂 lms_project
 ┣ 📂 backend
 ┃ ┣ 📂 courses           # Course-related views & models
 ┃ ┣ 📂 users             # Authentication & user profiles
 ┃ ┣ 📂 meetings          # Jitsi Meet integration
 ┃ ┣ 📂 ai                # AI Chatbot module
 ┃ ┣ 📜 settings.py       # Django settings
 ┃ ┣ 📜 urls.py           # URL routing
 ┣ 📂 frontend
 ┃ ┣ 📂 static
 ┃ ┃ ┣ 📜 styles.css      # Custom CSS (Glassmorphism)
 ┃ ┣ 📂 templates
 ┃ ┃ ┣ 📜 dashboard.html  # Main dashboard
 ┃ ┃ ┣ 📜 login.html      # Login page
 ┃ ┃ ┣ 📜 courses.html    # Course listing page
 ┃ ┣ 📜 script.js         # JS for interactive UI
 ┣ 📜 manage.py           # Django project entry
 ┣ 📜 README.md           # Project documentation
```

---

## **📖 Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/lokeshramchand-ctrl/lms_project.git
cd lms_project
```

### **2️⃣ Install Dependencies**
```bash
pip install -r requirements.txt  # Install backend dependencies
npm install                      # (If using additional frontend tools)
```

### **3️⃣ Apply Migrations**
```bash
python manage.py migrate
python manage.py makemigrations
```

### **4️⃣ Run the Server**
```bash
python manage.py runserver
```
🌍 Open `http://127.0.0.1:8000/` in your browser.

---

## **🔗 API Endpoints**
| Endpoint             | Method | Description |
|----------------------|--------|-------------|
| `/register/`        | POST   | Register a new user |
| `/login/`           | POST   | User login (Face Auth or Password) |
| `/courses/`         | GET    | Get all courses |
| `/courses/enroll/`  | POST   | Enroll in a course |
| `/meetings/create/` | POST   | Create a Jitsi Meeting |
| `/chatbot/ask/`     | GET    | AI Chatbot Response |

---

## **👨‍💻 Contributing**
🔹 **Fork the repository**  
🔹 **Create a new branch** (`git checkout -b feature-name`)  
🔹 **Commit your changes** (`git commit -m "Added new feature"`)  
🔹 **Push to GitHub** (`git push origin feature-name`)  
🔹 **Submit a Pull Request**  

---

## **📜 License**
MIT License © 2025 **Lokesh Ram Chand Bazaru**

---

## **🌟 Final Thoughts**
🎯 This **LMS** is designed to **enhance online education** by integrating **AI, video conferencing, and analytics**. More **features** like **quizzes, live discussions, and gamification** can be added in future updates.

🔗 **GitHub Repo:** [LMS Project](https://github.com/lokeshramchand-ctrl/lms_project)  
🔗 **Figma File:** [Figma](https://www.figma.com/design/fmvt6S6SyGkg0ixPhgu3N8/LMS?m=auto&t=eiedjn2IqzdD5wgB-1)


