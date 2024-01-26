import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IToss } from "./TossForm";

interface IProps {
  tossHistories: IToss[];
  onDelete: (id: string) => void;
}

export function TossTable({ tossHistories, onDelete }: IProps) {
  return (
    <Table>
      {tossHistories.length > 0 ? null : (
        <TableCaption>No history found!</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-[150px] w-[120px]">Date</TableHead>
          <TableHead>Option 1</TableHead>
          <TableHead>Option 2</TableHead>
          <TableHead>Won</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tossHistories.map((toss) => (
          <TableRow key={toss.id}>
            <TableCell className="font-medium">{toss.date}</TableCell>
            <TableCell>{toss.options[0]}</TableCell>
            <TableCell>{toss.options[1]}</TableCell>
            <TableCell className="text-green-600">{toss.result}</TableCell>
            <TableCell className="text-right cursor-pointer text-red-500">
              <span onClick={() => onDelete(toss.id)}> X</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
