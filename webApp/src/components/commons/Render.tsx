import React, { useState, useEffect, useRef } from "react"
import { useSpring, animated as a } from "react-spring"

export default ({ showSteps, query = "" }: { showSteps: boolean; query: string }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const targetRef = useRef<HTMLTextAreaElement | null>(null)

    const [{ xy }, set] = useSpring(() => ({
        xy: [window.innerWidth / 2, window.innerHeight / 4],
        config: { duration: 2000 },

        onRest: () => {
            setIsHover(true)
        }
    }))

    useEffect(() => {
        if (targetRef.current) {
            if (query !== "") {
                setIsHover(false)
                setIsVisible(true)

                xy.set([window.innerWidth / 2, window.innerHeight / 4])
                targetRef.current.value = ""
                const { top, left } = targetRef.current.getBoundingClientRect()
                if (showSteps) {
                    set({
                        xy: [left, top]
                    })
                } else {
                    set({
                        xy: [left + 10, top - 270]
                    })
                }

                const timer = setTimeout(() => {
                    setIsVisible(false)
                }, 2800)

                return () => {
                    clearTimeout(timer)
                }
            } else {
                setIsVisible(false)
                targetRef.current.value = ""
            }
        }
    }, [set, targetRef.current, query])

    useEffect(() => {
        if (targetRef.current && !isVisible && isHover) {
            if (showSteps) targetRef.current.focus()
            // get current text from query string

            if (query === "") return
            let index = 0

            targetRef.current.value += query[index++]

            const interval = setInterval(() => {
                if (targetRef.current) {
                    targetRef.current.value += query[index++]
                    if (showSteps) targetRef.current.focus()
                }

                if (index === query.length) {
                    clearInterval(interval)
                }
            }, 300)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isVisible, targetRef.current, isHover])

    return (
        <>
            <a.svg
                className="absolute w-10 h-12 z-20 rounded-full pointer-events-none"
                style={{
                    display: isVisible ? "block" : "none",
                    transform: xy.to((x, y) => `translate3d(${x}px,${y}px,0)`)
                }}
            >
                {isHover ? <TextCursor /> : <Cursor />}
            </a.svg>

            <div className="flex py-4 w-full flex-col min-h-screen">
                {showSteps && (
                    <a href="https://chat.openai.com" target="_blank">
                        <div className="flex flex-col justify-center items-center mb-6">
                            <b>Step 1:</b> Go on chat.openai.com<img className="h-10 mt-4" src="/img/url.png"></img>
                        </div>
                    </a>
                )}

                <div className="flex flex-col justify-center items-center ">
                    {showSteps && (
                        <div className="flex flex-col justify-center items-center">
                            <b>Step 2:</b> Ask your question
                        </div>
                    )}
                    <a href="https://chat.openai.com" target="_blank">
                        <div className="shadow-2xl rounded-2xl overflow-hidden max-w-3xl -mt-16 scale-75">
                            <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                                <div className="flex-1 overflow-hidden">
                                    <div className="h-full dark:bg-gray-800">
                                        <div className="flex flex-col text-sm dark:bg-gray-800">
                                            <div className="text-gray-800 w-full mx-auto md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col dark:text-gray-100">
                                                <h1 className="text-4xl font-semibold text-center mt-6 ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
                                                    ChatGPT
                                                </h1>
                                                <div className="md:flex items-start text-center gap-3.5 px-10">
                                                    <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                                                        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                                                            <svg
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeWidth="1.5"
                                                                viewBox="0 0 24 24"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="h-6 w-6"
                                                                height="1em"
                                                                width="1em"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <circle cx="12" cy="12" r="5"></circle>
                                                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                                                <line
                                                                    x1="18.36"
                                                                    y1="18.36"
                                                                    x2="19.78"
                                                                    y2="19.78"
                                                                ></line>
                                                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                                            </svg>
                                                            Examples
                                                        </h2>
                                                        <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                                                            <button className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md ">
                                                                "Explain quantum computing in simple terms" →
                                                            </button>
                                                            <button className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md ">
                                                                "Got any creative ideas for a 10 year old’s birthday?" →
                                                            </button>
                                                            <button className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md ">
                                                                "How do I make an HTTP request in Javascript?" →
                                                            </button>
                                                        </ul>
                                                    </div>
                                                    <div className="flex-col mb-8 md:mb-auto gap-3.5 flex-1 sm:flex hidden">
                                                        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                aria-hidden="true"
                                                                className="h-6 w-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                                                ></path>
                                                            </svg>
                                                            Capabilities
                                                        </h2>
                                                        <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                                                            <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                                                Remembers what user said earlier in the conversation
                                                            </li>
                                                            <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                                                Allows user to provide follow-up corrections
                                                            </li>
                                                            <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                                                Trained to decline inappropriate requests
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className=" flex-col mb-8 md:mb-auto gap-3.5 flex-1 sm:flex hidden">
                                                        <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                                                            <svg
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeWidth="1.5"
                                                                viewBox="0 0 24 24"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="h-6 w-6"
                                                                height="1em"
                                                                width="1em"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                            </svg>
                                                            Limitations
                                                        </h2>
                                                        <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                                                            <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                                                May occasionally generate incorrect information
                                                            </li>
                                                            <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                                                May occasionally produce harmful instructions or biased
                                                                content
                                                            </li>
                                                            <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                                                Limited knowledge of world and events after 2021
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-20 flex-shrink-0"></div>

                                            <div className="w-full md:bg-vert-light-gradient bg-white dark:bg-gray-800 dark:md:bg-vert-dark-gradient pt-2">
                                                <form className="flex p-4">
                                                    <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                                                        <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                                                            <textarea
                                                                id="prompt-textarea"
                                                                tabIndex={0}
                                                                ref={targetRef}
                                                                data-id="root"
                                                                placeholder="Send a message..."
                                                                className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 outline-none"
                                                            ></textarea>
                                                            <button className="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40">
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="h-4 w-4 mr-1"
                                                                    height="1em"
                                                                    width="1em"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

const Cursor = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 28 28">
        <polygon fill="#FFFFFF" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 " />
        <polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 " />
        <rect x="12.5" y="13.6" transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8" />
        <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 " />
    </svg>
)

const TextCursor = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 32 32" width="40">
        <path
            d="m6.12306605-.48331676c.43304536-.02942018.89723494-.01586641 1.23506765.01110645l.09836607 2.00031187c-.52088553-.02633116-.86402421-.03615261-1.16297111-.01823278-.57216322.1246759-.83397559.26379885-1.13476879.47262866-.20678677.14251521-.54543639.60542479-.68837291.9244994v4.53970853h.998v1.984h-.998v3.57686113c.14285978.3186299.48159131.7805976.69278827.9256073.28177652.1964385.52739561.3374074.74486623.4121252.92617851.1117241.86141186.0439655 1.38886347.0608526l.24148845 1.9771822c-.63869922.0316331-1.03914186.0381475-1.41606129.0122618-.31198863-.0214264-.57343006-.0643378-.77405544-.129216-.41684626-.1296585-.85258908-.3604995-1.32295099-.6884424-.16852556-.1156905-.3571101-.2906327-.54285865-.4981462-.17040902.2017941-.33955796.3725205-.48392771.4855461-.40405946.3138676-.86631905.544191-1.35971316.6990619-.21164232.068207-.47249574.1108318-.78353769.1322303-.43450358.0298922-.90002831.0163041-1.23810501-.010835l-.09691742-2.0002571c.51770616.0263348.86168069.0362399 1.16109487.0181487.6186734-.1394818.87678125-.2519735 1.08726671-.4154673.19712987-.1543365.58456002-.6802379.70170954-.9838289l.01232275-3.57368433h-1.00027293v-1.984h1.002v-4.53315423c-.13203427-.30699537-.51655024-.83390163-.71128328-.98567507-.2013222-.15578504-.43877755-.27368925-.70166256-.36109174-.92774648-.11104657-.86334532-.04378063-1.3908609-.06035307l-.24301648-1.97729129c.64057546-.03160079 1.04058994-.03810767 1.41699023-.01249118.31067274.02114331.57118123.06339129.7795926.13006754.50016024.15848101.96025701.38783055 1.36565801.70154178.14340254.11176212.31252725.28238091.4832615.48453047.18451625-.20650555.37147758-.38041205.53791304-.49511426.47467546-.32956039.90822271-.55967002 1.31895768-.68980909.21133301-.06776711.4720386-.11004715.78312925-.13118199z"
            fillRule="evenodd"
            stroke="#fff"
            strokeLinejoin="round"
            transform="translate(13 8)"
        />
    </svg>
)
