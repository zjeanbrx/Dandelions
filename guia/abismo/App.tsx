import React, { useEffect, useState } from "react";
import "./App.css"
import { CharacterComposition } from "./CharacterComposition";
import { CharacterName } from "./character-data";
import { Navbar } from "./Navbar";
import yaml from "yaml";

export interface Team {
  title: string;
  characters: CharacterName[];
  sides: [string, string];
  text: string;
  youtube_url?: string;
}

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  async function fetchTeams() {
    try {
      const rawTeams = await fetch("/guia/abismo/abyss.txt");
      return rawTeams.text();
    } catch {
      return "";
    }
  }

  useEffect(() => {
    fetchTeams().then((teams) => {
      const lines = teams.split("\n");
      const parsingTeams = [];
      let currentTeam;
      let isYamlOpen = false;
      for (let i = 0; i < lines.length; ++i) {
        if (lines[i].startsWith("---") && !isYamlOpen) {
          isYamlOpen = true;
          currentTeam = {
            yaml: "",
            markdown: "",
          };
        } else if (lines[i].startsWith("---") && isYamlOpen) {
          isYamlOpen = false;
          parsingTeams.push(currentTeam);
        } else if (isYamlOpen) {
          currentTeam!.yaml += lines[i] + "\n";
        } else {
          currentTeam!.markdown += lines[i] + "\n";
        }
      }
      const parsedTeams: Team[] = [];
      for (const parsingTeam of parsingTeams) {
        const yamlTeam = yaml.parse(parsingTeam!.yaml);
        parsedTeams.push({
          title: yamlTeam.titulo,
          characters: yamlTeam.personagens,
          sides: yamlTeam.lados,
          text: parsingTeam!.markdown ?? "",
          youtube_url: yamlTeam.youtube,
        });
      }

      setTeams(parsedTeams);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="grid">
        <h1>Guia de Abismo</h1>
        <h2>Introdução</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quam dui, imperdiet nec congue sed, fermentum tincidunt mauris. In interdum et sapien at bibendum. Sed pretium, justo nec elementum mollis, nisl justo pellentesque sapien, ac fringilla ligula quam et metus. Duis eget lobortis mauris. Duis tellus sapien, varius sed convallis non, maximus a arcu. Sed id velit feugiat, laoreet massa nec, egestas ipsum. Vivamus vitae justo quis nisi imperdiet faucibus tincidunt vehicula lacus. Sed eleifend mattis congue. Vestibulum vestibulum ipsum sed cursus bibendum. Nam fermentum felis nec dui fermentum laoreet. Integer vel ex non justo iaculis dictum. Integer aliquet eleifend dapibus. Nullam maximus tellus libero, bibendum auctor risus malesuada eu. Pellentesque in tortor aliquam, pellentesque metus vitae, scelerisque sapien. Donec aliquam interdum nulla, vitae tristique nunc hendrerit at.</p>
        {teams.map((team, index) => <CharacterComposition key={index} team={team} />)}
      </main>
    </>
  )
}

export default App;
