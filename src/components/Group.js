import { useState, useEffect } from "react";
import { Header, Icon, Input } from "semantic-ui-react";
import { Button, Modal } from "react-bootstrap";
import { createGroup, getUsersGroups } from "../api/Calls";
import GroupFiles from "./GroupFiles";

const Group = ({ email, keys, setView }) => {
  const [groups, setGroups] = useState([]);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [groupName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [flag]);

  const updateData = async () => {
    let usergroups = await getUsersGroups(email);
    let grouparr = [];
    if (usergroups) {
      usergroups.forEach((g) => {
        grouparr.push(g);
      });
    }
    // console.log(grouparr);
    setGroups(grouparr);
  };

  const handleSelect = (group) => {
    setSelected(group);
  };

  const GroupButton = ({ group }) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          variant="outline-info"
          className="w-100 mx-3 mt-1 mb-2 px-4 py-2 "
        >
          <div
            id={group.id}
            className="d-flex align-items-center"
            onClick={() => handleSelect(group)}
          >
            <div id={group.id} className="overflow-hidden mr-3 text-truncate">
              {group.name}
            </div>
            {email === group.owner ? (
              <div id={group.id} className="ml-auto">
                Admin
              </div>
            ) : (
              <div id={group.id}></div>
            )}
          </div>
        </Button>
      </div>
    );
  };

  const DisplayGroups = () => {
    return (
      <div className="h-100 w-100">
        {groups.length > 0 ? (
          groups.map((g, index) => <GroupButton group={g} key={index} />)
        ) : (
          <div className="h-100 col d-flex flex-column justify-content-center align-items-center">
            <div className="col-xs-6 col-md-3 text-center">
              <Header icon>
                <Icon name="group" />
                No Groups
              </Header>
              <p>Make one with the button or be added to a group by a friend</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleNewGroup = async () => {
    setShow(true);
  };

  const handleInput = (e) => {
    if (e.target.id === "name") setName(e.target.value);
    else setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (groupName.length > 0 && password.length > 0) {
      setShow(false);
      createGroup(email, groupName, password).then(() => {
        console.log("group created");
        setFlag(!flag);
      });
    }
  };

  return (
    <div>
      {selected === "" ? (
        <div className="vh col py-4">
          <div className="h-100 d-flex flex-column">
            <div className="row px-3 pt-2">
              <div className="col-6 d-flex align-items-center">
                <Header>My Groups</Header>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <div className="ml-auto">
                  <Button
                    className="widebtn"
                    variant="info"
                    onClick={handleNewGroup}
                  >
                    New Group
                  </Button>
                </div>
              </div>
            </div>
            <div className="grow scroll mt-4">
              <DisplayGroups />
            </div>
          </div>
          <Modal show={show} onHide={() => setShow(false)} size="sm" centered>
            <Modal.Header>
              <div className="col text-center">
                <Modal.Title>Create Group</Modal.Title>
                <div className="pt-3">
                  <Input
                    id="name"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={handleInput}
                  />
                </div>
                <div className="pt-3">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInput}
                  />
                </div>
                <div className="py-3">
                  <Button variant="info" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </Modal.Header>
          </Modal>
        </div>
      ) : (
        <GroupFiles setSelected={setSelected} group={selected} />
      )}
    </div>
  );
};

export default Group;
