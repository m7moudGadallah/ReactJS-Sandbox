import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

function App() {
  const user = {
    name: "Jonas Schmedtmann",
    bio: "Full-stack web developer and teacher at Udemy. When not coding or preparing a course, I like to play board games, to cook (and eat), or to just enjoy the Portuguese sun at the beach.",
    avatar: "jonas.jpeg",
    skills: [
      {
        name: "HTML+CSS",
        emoji: "💪",
        color: "blue",
      },
      {
        name: "JavaScript",
        emoji: "💪",
        color: "yellow",
      },
      {
        name: "Web Design",
        emoji: "💪",
        color: "lightgreen",
      },
      {
        name: "Git & Github",
        emoji: "💪",
        color: "lightsalmon",
      },
      {
        name: "React",
        emoji: "💪",
        color: "cyan",
      },
      {
        name: "Svelte",
        emoji: "👶",
        color: "red",
      },
    ],
  };
  return <ProfileCard {...user} />;
}

function ProfileCard(props) {
  const { name, bio, avatar, skills } = props;
  return (
    <div className="profile-card container">
      <div className="card__img">
        <ProfilePhoto src={avatar} alt={name} />
      </div>
      <ProfileCardHeader name={name} bio={bio} />
      <ProfileSkillBox skills={skills} />
    </div>
  );
}

function ProfilePhoto(props) {
  const { src, alt } = props;

  return <img src={src} alt={alt} />;
}

function ProfileCardHeader(props) {
  const { name, bio } = props;
  return (
    <div className="card__header">
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}

function ProfileSkillBox(props) {
  const { skills } = props;
  return (
    <div className="skills-bx">
      {skills.map((skill, index) => (
        <ProfileSkill skill={skill} key={index} />
      ))}
    </div>
  );
}

function ProfileSkill(props) {
  const { name, emoji, color } = props.skill;
  return (
    <div className={`skill--${color}`}>
      <span className="skill__name">
        {name}
        <span className="skill__emoji">{emoji}</span>
      </span>
    </div>
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
