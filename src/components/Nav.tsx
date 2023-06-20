import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { type Session } from "next-auth";

const Nav: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex min-h-[60px] max-w-screen-md items-center justify-between px-4">
        <div className="pointer-events-none flex items-center gap-1.5">
          <Logo />
          <h1 className="text-2xl font-bold  tracking-tighter text-gray-800">financy</h1>
        </div>
        {sessionData === undefined ? null : <Auth sessionData={sessionData} />}
      </div>
    </nav>
  );
};

const Logo: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M23.59 3.475a5.1 5.1 0 0 0-3.05-3.05c-1.31-.42-2.5-.42-4.92-.42H8.36c-2.4 0-3.61 0-4.9.4a5.1 5.1 0 0 0-3.05 3.06C0 4.765 0 5.965 0 8.365v7.27c0 2.41 0 3.6.4 4.9a5.1 5.1 0 0 0 3.05 3.05c1.3.41 2.5.41 4.9.41h7.28c2.41 0 3.61 0 4.9-.4a5.1 5.1 0 0 0 3.06-3.06c.41-1.3.41-2.5.41-4.9v-7.25c0-2.41 0-3.61-.41-4.91zm-6.17 4.63l-.93.93a.5.5 0 0 1-.67.01a5 5 0 0 0-3.22-1.18c-.97 0-1.94.32-1.94 1.21c0 .9 1.04 1.2 2.24 1.65c2.1.7 3.84 1.58 3.84 3.64c0 2.24-1.74 3.78-4.58 3.95l-.26 1.2a.49.49 0 0 1-.48.39H9.63l-.09-.01a.5.5 0 0 1-.38-.59l.28-1.27a6.54 6.54 0 0 1-2.88-1.57v-.01a.48.48 0 0 1 0-.68l1-.97a.49.49 0 0 1 .67 0c.91.86 2.13 1.34 3.39 1.32c1.3 0 2.17-.55 2.17-1.42c0-.87-.88-1.1-2.54-1.72c-1.76-.63-3.43-1.52-3.43-3.6c0-2.42 2.01-3.6 4.39-3.71l.25-1.23a.48.48 0 0 1 .48-.38h1.78l.1.01c.26.06.43.31.37.57l-.27 1.37c.9.3 1.75.77 2.48 1.39l.02.02c.19.2.19.5 0 .68z"
      />
    </svg>
  );
};

const Auth: React.FC<{ sessionData: Session | null }> = ({ sessionData }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {sessionData !== null && (
        <img
          src={sessionData?.user?.image || "/profile.jpg"}
          className="h-8 w-8 rounded-full"
          alt="Profile picture"
          onError={(e) => ((e.target as HTMLImageElement).src = "/profile.jpg")}
        />
      )}

      <Button variant="outline" size="sm" onClick={sessionData ? () => void signOut() : () => void signIn("google")}>
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

export default Nav;
