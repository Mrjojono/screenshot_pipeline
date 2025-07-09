function InputCustom({id,title,type,click}) {


    return (
        <>
            <label className="flex flex-col gap-2" htmlFor={id} >
            <span className="flex flex-start-full  text-2xl">{title}</span>
            <input
                onChange={click}
                className="
                   w-[300px]
                   rounded-lg
                   p-2
                   border-2
                   focus-within:border-blue-500 focus-within:bg-blue-50
                   outline-none
                   focus:border-2
                   focus:shadow-blue-400
                   focus:shadow-2xl" type={type}  />
        </label>
        </>
    )
}
export  default InputCustom;