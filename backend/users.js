const users = [];

// This is the function that will be called when a user joins a room
export const addUser = ({ id, name, room }) => {
  // Check for existing user
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  // Validate name and room
  if (!name || !room) return { error: "이름과 방이 필요해요." };

  // Validate username
  if (existingUser) {
    console.log("이미 존재합니다!");
  }

  // Store user
  const user = { id, name, room };
  users.push(user);

  return { user };
};

// This is the function that will be called when a user leaves a room
export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// This is the function that will be called when a user sends a message
export const getUser = (id) => users.find((user) => user.id === id);

// This is the function that will be called when a user sends a message
export const getUsersInRoom = (room) =>
  users.filter((user) => user.room === room);
