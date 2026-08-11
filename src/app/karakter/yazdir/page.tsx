import type {Metadata} from "next";
import {PrintableCharacter} from "@/components/printable-character";
import {getAbilities} from "@/lib/abilities";
import {getItems} from "@/lib/items";
export const metadata:Metadata={title:"Karakter Kâğıdı"};
export default function PrintPage(){return <PrintableCharacter abilities={getAbilities()} items={getItems()}/>}
