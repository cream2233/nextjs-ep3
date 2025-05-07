"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function UserListPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("โหลด users ไม่ได้:", err));
  }, []);

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f4f5fa] min-h-screen">
      <div className="bg-[#873747] h-[180px] px-6 pt-6 text-white relative">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">☰</div>
          <h1 className="text-xl font-semibold">แก้ไขข้อมูล</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-[-100px] bg-white rounded-xl p-8 shadow-lg relative z-10">
        <div className="flex items-center border rounded-lg px-4 py-2 mb-6 bg-gray-100">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />

          <input
            type="text"
            placeholder="search user"
            className="w-full outline-none bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>👤</span> User List
        </h2>

        <div className="flex px-4 py-3 font-semibold text-gray-700 border-b text-sm bg-white">
          <div className="w-[30%] text-center">อีเมล</div>
          <div className="w-[25%] text-center">ชื่อ-สกุล</div>
          <div className="w-[20%] text-center">สาขา</div>
          <div className="w-[15%] text-center">วันหมดอายุ</div>
          <div className="w-[10%] text-center"></div>
        </div>

        <div className="space-y-2 mt-2 text-sm">
          {filteredUsers.map((user, index) => (
            <div
              key={user.email}
              className={`flex items-center px-4 py-2 rounded-lg ${index === 0 ? 'bg-blue-50 border border-blue-300' : 'bg-gray-100'
                }`}
            >
              <div className="w-[30%] text-center">{user.email}</div>
              <div className="w-[25%] text-center">{user.firstName} {user.lastName}</div>
              <div className="w-[20%] text-center">{user.major}</div>
              <div className="w-[15%] text-center">{user.expire}</div>
              <div className="w-[10%] text-center">
                <button
                  onClick={() => router.push(`/users/edit/${user.email}`)}
                  className="text-xl"
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserListPage