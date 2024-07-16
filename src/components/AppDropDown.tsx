type DropDownProps = {
    value: string;
    Options: any;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AppDropDown = (props: DropDownProps) => {
    // console.log(props.Options)
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 w-full">
                {props.value}
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
                {
                    props.Options.map((status: string) => (
                        <li key={status} >
                            <input
                                type="radio"
                                name="status"
                                className=" btn btn-sm btn-block btn-ghost justify-start"
                                aria-label={status}
                                onChange={(e) => props.setValue(e.target.value)}
                                value={status} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}