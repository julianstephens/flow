import Spinner from "~/assets/loader.svg";

export const Loader = () => (
    <div className="col centered">
        <Spinner />
        <p className="text-sm">Loading...</p>
    </div>
);
