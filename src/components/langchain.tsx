'use client';

import { OpenAI } from 'langchain/llms/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { Calculator } from 'langchain/tools/calculator';
import { useState, useRef } from 'react';
import type { ChainValues } from 'langchain/dist/schema';
import { Sparkles, Wand2 } from 'lucide-react';

export const Langchain = () => {
  const [result, setResult] = useState<ChainValues>();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const langchainQuery = async () => {
    setIsLoading(true);
    const model = new OpenAI({ temperature: 0 });
    const tools = [new Calculator()];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'zero-shot-react-description',
    });

    console.log('Loaded agent.');
    console.log(`Executing with input "${inputRef}"...`);

    const result = await executor.call({ inputRef });

    setResult(result);
    console.log(`Got output ${result}`);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 border border-red-500 p-4">
      <form className="flex flex-row text-black">
        <input
          className="border border-slate-500 p-2"
          type="text"
          placeholder="Ask me anything..."
          ref={inputRef}
        />
        <button
          className="text-serif ml-2 flex flex-row border border-slate-500 p-2 text-2xl font-bold text-slate-300"
          type="submit"
          onClick={langchainQuery}
        >
          {isLoading ? <Sparkles className="text-fuchsia-400" /> : <Wand2 />}
        </button>
      </form>
      <h2>Output:</h2>
      <p>{result?.output}</p>
    </div>
  );
};
