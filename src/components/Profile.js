import { Header, Icon, Segment, Card, Image } from "semantic-ui-react";
import Files from "./Files";
// import person from "../assets/person.svg";

const Profile = () => {
  return (
    <div className="col vh py-4">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <Card>
            <Image
              // src={person}
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>Juanny Cash</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 1998</span>
              </Card.Meta>
              <Card.Description>
                Juan is an F1 driver/ musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p>
                <Icon name="user" />
                69k Friends
              </p>
            </Card.Content>
          </Card>
        </div>
        <div className="col-sm-12 col-md-9">
          <Files />
        </div>
      </div>
      <div className="row pt-4">
        <div className="col">
          <Segment placeholder>
            <Header icon>idk section</Header>
          </Segment>
        </div>
      </div>
    </div>
  );
};

export default Profile;
