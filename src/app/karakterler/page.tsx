import type {Metadata} from "next";
import {CharacterManager} from "@/components/character-manager";
export const metadata:Metadata={title:"Karakterlerim"};
export default function CharactersPage(){return <CharacterManager/>}
