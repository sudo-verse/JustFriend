// generateUsers.js
import fs from "fs";

const users = [];
const password = "$2b$10$samepasswordforallusers";

for (let i = 1; i <= 500; i++) {
  users.push({
    _id: { $oid: `702000000000000000000${i.toString().padStart(3, "0")}` },
    name: `Male User ${i}`,
    email: `maleuser${i}@gmail.com`,
    password,
    gender: "male",
    about: "Software developer",
    photoUrl: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    createdAt: { $date: "2026-01-01T09:00:00.000Z" },
    updatedAt: { $date: "2026-01-01T09:00:00.000Z" },
    __v: 0
  });

  users.push({
    _id: { $oid: `702000000000000000001${i.toString().padStart(3, "0")}` },
    name: `Female User ${i}`,
    email: `femaleuser${i}@gmail.com`,
    password,
    gender: "female",
    about: "Frontend developer",
    photoUrl: `https://randomuser.me/api/portraits/women/${i}.jpg`,
    createdAt: { $date: "2026-01-01T09:00:00.000Z" },
    updatedAt: { $date: "2026-01-01T09:00:00.000Z" },
    __v: 0
  });
}

fs.writeFileSync("users.mock.json", JSON.stringify(users, null, 2));
console.log("✅ users.mock.json generated with 100 users");
