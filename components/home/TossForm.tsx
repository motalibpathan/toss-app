"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TossTable } from "./TossTable";

export interface IToss {
  id: string;
  date: string;
  options: string[];
  result: string;
}

const TOSS_INITIAL: IToss = {
  id: Math.random().toString(),
  date: "",
  options: ["", ""],
  result: "",
};

const TossForm = () => {
  const [toss, setToss] = useState<IToss>(TOSS_INITIAL);
  const [tab, setTab] = useState<"custom" | "head">("custom");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<IToss[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parsed = JSON.parse(localStorage.getItem("tossHistory") || "[]");
      setHistory(parsed);
    }
  }, []);

  const handleToss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setToss((prev) => ({ ...prev, result: "" }));
    await new Promise((r) => setTimeout(r, 1000));
    const random = Math.floor(Math.random() * 2);

    const uToss = {
      ...toss,
      result: toss.options[random],
      date: new Date().toDateString(),
      id: Math.random().toString(),
    };

    setToss(uToss);
    // only store 5 histories
    if (history.length > 4) {
      history.pop();
    }
    history.unshift(uToss);

    if (typeof window !== "undefined") {
      localStorage.setItem("tossHistory", JSON.stringify(history));
    }
    setHistory([...history]);
    setLoading(false);
  };

  const handleTabClick = useCallback((value: "custom" | "head") => {
    setTab(value);
    if (value === "head") {
      setToss((prev) => ({ ...prev, options: ["Head", "Tail"] }));
    } else {
      setToss((prev) => ({ ...prev, options: ["", ""] }));
    }
  }, []);

  const handleDeleteHistory = useCallback((id: string) => {
    if (typeof window !== "undefined") {
      const parsed = JSON.parse(localStorage.getItem("tossHistory") || "[]");
      const filtered = Array.isArray(parsed)
        ? parsed.filter((toss: IToss) => toss.id !== id)
        : [];
      setHistory(filtered);
    }
  }, []);

  return (
    <div className="flex-1 w-full flex items-center flex-col gap-4">
      <Tabs value={tab} className=" w-full md:w-[400px] mt-24">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="custom" onClick={() => handleTabClick("custom")}>
            Custom
          </TabsTrigger>
          <TabsTrigger value="head" onClick={() => handleTabClick("head")}>
            Head Tail
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        onSubmit={handleToss}
        className=" md:w-[400px] w-full flex flex-col gap-5 items-center"
      >
        <Input
          type="text"
          id="opt1"
          name="opt1"
          placeholder="Enter Option 1"
          value={toss.options[0]}
          onChange={(e) =>
            setToss({ ...toss, options: [e.target.value, toss.options[1]] })
          }
          required
          className="w-full"
        />
        <Input
          type="text"
          id="opt2"
          name="opt2"
          placeholder="Enter Option 2"
          value={toss.options[1]}
          onChange={(e) =>
            setToss({ ...toss, options: [toss.options[0], e.target.value] })
          }
          required
          className="w-full"
        />
        <Button disabled={loading} variant={"outline"}>
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <p className="ml-2">Toss</p>
            </>
          ) : (
            <p>Toss</p>
          )}
        </Button>
      </form>
      <div className="flex flex-col gap-5 items-center">
        {toss.result && (
          <div className="flex ">
            <div className="flex items-center bg-green-600 text-white px-3 py-2">
              <p>Won</p>
            </div>
            <div className="flex items-center border border-green-600 text-white px-3">
              <p className="text-green-600 font-bold">{toss.result}</p>
            </div>
          </div>
        )}
      </div>
      <p className="flex-1 w-full text-xl text-left font-bold">Toss History</p>
      <TossTable tossHistories={history} onDelete={handleDeleteHistory} />
      <p className="flex-1 w-full text-slate-500 text-sm text-left ">
        *This history is available only in your browser. It is not stored
        anywhere.
      </p>
    </div>
  );
};

export default TossForm;
