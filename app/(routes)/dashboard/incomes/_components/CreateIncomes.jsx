"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateIncomes({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  /**
   * Used to Create New Income
   */
  const onCreateIncomes = async () => {
    try {
      const response = await fetch('/api/incomes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        }),
      });

      const result = await response.json();

      if (result.id) {
        refreshData();
        toast("New Income Source Created!");
      }
    } catch (error) {
      console.error("Error creating income:", error);
      toast("Failed to create income");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-gray-100 dark:bg-gray-800 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed border-gray-300 dark:border-gray-600
            cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <h2 className="text-3xl text-gray-700 dark:text-gray-300">+</h2>
            <h2 className="text-gray-700 dark:text-gray-300">Create New Income Source</h2>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Create New Income Source</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg border-gray-300 dark:border-gray-600"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-gray-800 dark:text-gray-200 font-medium my-1">Source Name</h2>
                  <Input
                    placeholder="e.g. Youtube"
                    onChange={(e) => setName(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-gray-800 dark:text-gray-200 font-medium my-1">Montly Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000₹"
                    onChange={(e) => setAmount(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateIncomes()}
                className="mt-5 w-full rounded-full"
              >
                Create Income Source
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateIncomes;
