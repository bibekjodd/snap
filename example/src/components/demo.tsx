'use client';

import { usePlayerStore } from '@/store/use-player';
import { useShallow } from '@jodd/snap';
import { Fragment, useEffect, useRef } from 'react';

export default function Demo() {
  const rerenderCountRef = useRef(0);
  useEffect(() => {
    usePlayerStore.getState().fetchData();
  }, []);

  useEffect(() => {
    rerenderCountRef.current++;
  });

  return (
    <div>
      <div className="rounded-md border border-slate-200 p-4">
        <h1 className="text-xl font-semibold">App</h1>
        <Counter count={rerenderCountRef.current} />
      </div>
      <PlayerDetails />
      <PlayerData />
      <Form />
    </div>
  );
}

function Counter({ count }: { count: number }) {
  return <div className="font-medium">Rerender Count: {count}</div>;
}

function PlayerDetails() {
  const rerenderCountRef = useRef(0);
  const name = usePlayerStore((state) => state.name);

  // Rerenders when one of active or lastScores changes
  const [active, lastScores] = usePlayerStore(
    useShallow((state) => [state.active, state.lastScores])
  );

  useEffect(() => {
    rerenderCountRef.current++;
  });

  return (
    <section className="rounded-md border border-slate-200 p-4">
      <h2 className="font-medium">PlayerDetails</h2>
      <Counter count={rerenderCountRef.current} />
      <p>Name: {name}</p>
      <p>Active: {active ? 'Active' : 'Inactive'}</p>
      <p>
        Last Scores:
        {lastScores.map((score, i) => (
          <Fragment key={i}>{score} </Fragment>
        ))}
      </p>
    </section>
  );
}

function PlayerData() {
  const rerenderCountRef = useRef(0);
  // Rerenders when one of age or data changes
  const { age, data } = usePlayerStore(
    useShallow((state) => ({ age: state.age, data: state.data }))
  );

  useEffect(() => {
    rerenderCountRef.current++;
  });

  return (
    <section className="rounded-md border border-slate-200 p-4">
      <h2 className="font-medium">Player Data</h2>
      <Counter count={rerenderCountRef.current} />
      <p>Age: {age}</p>
      <p>{JSON.stringify(data || 'no-data')}</p>
    </section>
  );
}

function Form() {
  const rerenderCountRef = useRef(0);
  const { updateName, updateAge, toggleActive } = usePlayerStore.getState();
  const [name, age, active] = usePlayerStore(
    useShallow((state) => [state.name, state.age, state.active])
  );

  useEffect(() => {
    rerenderCountRef.current++;
  });

  return (
    <div className="flex flex-col space-y-5 rounded-md border border-slate-200 p-4">
      <h2 className="font-semibold">Form</h2>
      <Counter count={rerenderCountRef.current} />
      <div className="flex flex-col space-y-2">
        <span>Name</span>
        <input
          type="text"
          placeholder="Enter player name..."
          value={name}
          className="w-fit rounded-md border border-slate-200 p-2"
          onChange={(e) => updateName(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <span>Age</span>
        <input
          type="number"
          placeholder="Enter player age..."
          value={age}
          className="w-fit rounded-md border border-slate-200 p-2"
          onChange={(e) => updateAge(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center space-x-3">
        <input type="checkbox" checked={active} onChange={() => toggleActive()} />
        <span>Is Player active?</span>
      </div>
    </div>
  );
}
