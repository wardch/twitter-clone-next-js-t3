import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      {/* the code below makes the content full, unless its medium or large
        in which case it is 2xl max */}
      <div className="w-full overflow-scroll border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
