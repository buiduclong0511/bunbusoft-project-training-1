import styled from "styled-components";

export const AchievementsMenu = ({ achievements = [] }) => {
  return (
    <Container>
      <div className="heading">Achievements</div>
      <div className="listAchievements">
        {achievements.map((achievement) => (
          <div className="achievement" key={achievement.id}>
            <div className="img">
              <img src={achievement.image} alt="" />
            </div>
            <div className="info">
              <div className="title">{achievement.title}</div>
              <div className="description">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .heading {
    margin-top: 16px;
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 25px;
  }

  .achievement {
    display: flex;
    margin-bottom: 30px;

    .img {
      width: 50px;
      height: 50px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
