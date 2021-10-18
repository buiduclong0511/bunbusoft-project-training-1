import styled from "styled-components";

export const HomeMenu = () => {
  return (
    <Container>
      <div className="title">Newsletter</div>
      <div className="content">Sign up for our newsletter and never miss an update again.</div>
      <div className="title">Social Media</div>
      <div className="content">
        <p>Follow us on social media!</p>
        <div className="listIcon">
          <div className="icon">
            <img src="images/icons/icon-twitter.png" alt="" />
          </div>
          <div className="icon">
            <img src="images/icons/icon-googleplus.png" alt="" />
          </div>
          <div className="icon">
            <img src="images/icons/icon-facebook.png" alt="" />
          </div>
        </div>
      </div>
      <div className="title">Contact</div>
      <div className="content">
        <p>contact@littlealchemy.com</p>
      </div>
      <div className="title">Team</div>
      <div className="content">
        <p>A game by Jakub Koziol // @jakubkoziol</p>
        <p>Little Alchemy wouldn't be possible without the help from these fine folks:</p>
      </div>
      <div className="content">
        <p>
          Lukasz Nawrot - code <br />
          Marcin Bychawski - Code, Tools <br />
          Ewa Koziol - Icons
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .listIcon {
    display: flex;

    .icon {
      width: 60px;
      height: 60px;
      margin-right: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: 500;
  }

  .content {
    p {
      margin: 1em 0;
    }
  }
`;
