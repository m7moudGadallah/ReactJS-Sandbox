import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { data } from "./data";

function App() {
  const { user, skillLevel } = data;

  return <ProfileCard user={user} skillLevel={skillLevel} />;
}

function ProfileCard({ user, skillLevel }) {
  return (
    <div className="profile-card">
      <ProfileCardPhoto src={user.avatar} alt={user.name} />
      <ProfileCardHeader name={user.name} bio={user.bio} />
      <ProfileCardSkills skills={user.skills} skillLevel={skillLevel}/>
    </div>
  );
}

function ProfileCardPhoto({ src, alt }) {
  return (
    <div className="profile-card__photo">
      <img src={src} alt={alt} />
    </div>
  );
}

function ProfileCardHeader({ name, bio }) {
  return (
    <div className="profile-card__header">
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}

function ProfileCardSkills({ skills, skillLevel }) {
  return (
    <div className="profile-card__skills">
      {skills.map((skill) => (
        <ProfileCardSkill
          key={skill.name}
          skill={skill}
          skillLevel={skillLevel}
        />
      ))}
    </div>
  );
}

function ProfileCardSkill({ skill, skillLevel }) {
  return (
    <span className="skill" style={{backgroundColor: skill.color}}>
      {`${skill.name}${skillLevel?.[skill.level] || ""}`}
    </span>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
