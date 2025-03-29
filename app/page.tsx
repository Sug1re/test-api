"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Input,
  Typography,
} from "@mui/material";

type User = {
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // 検索ワードを管理
  const ref = useRef<HTMLInputElement>(null);

  // フィルタリングされたユーザーを計算
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography>検索アプリ</Typography>
        <Input
          ref={ref}
          onChange={(e) => setSearchTerm(e.target.value)} // `searchTerm` を更新
        />
      </Box>
      {filteredUsers.map((user, index) => (
        <Card
          key={index}
          sx={{ mt: 2, borderRadius: 3, border: "2px solid #FF6600" }}
        >
          <CardContent>
            <Typography>{user.name}</Typography>
          </CardContent>
          <CardContent>
            <Typography>{user.email}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
