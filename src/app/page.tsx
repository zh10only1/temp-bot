"use client";

import { useState } from "react";
import Container from '@/components/Container';
import Chat from '@/components/Chat';
import Banner from '@/components/Banner';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("spanish");
  return (
    <Container>
      <Banner selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
      <Chat selectedLanguage={selectedLanguage}/>
    </Container>
  );
}
