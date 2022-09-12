import Link from "next/link";
import moment from 'moment'


interface EventCardProps {
  name: string;
  desc: string;
  image: string;
  date?: string;
  link:string;
  id: string;
}

export default function EventCard({
  name,
  desc,
  image,
  date,
  link,
  id,
}: EventCardProps) {
    const ourDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    console.log(ourDate)

  return (
       <div className="my-10 shadow rounded-b-md">
                        <div className="w-full h-56 bg-top bg-cover rounded-t"
                            style={{backgroundImage:`url(${image})`}}>
                        </div>
                        <div className="flex flex-col w-full lg:flex-row ">
                            <div
                                className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-primary-200 md:rounded-bl-lg md:flex-col md:items-center md:justify-center md:w-1/4">
                                <div className="md:text-3xl">{moment(date).format('MMM')}</div>
                                <div className="md:text-6xl">{moment(date).format('d')}</div>
                                <div className="md:text-3xl">{moment(date).format('yyyy')}</div>
                            </div>
                            <div className="p-4 font-normal text-gray-800 md:w-3/4">
                                
                                    <a target="_blank" href={`${link}`} rel="noreferrer">
                                        <span className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{name}</span>
                                    </a>
                                
                                   <div
                                        className="leading-normal"
                                        dangerouslySetInnerHTML={{
                                            __html:desc.substring(0,280)
                                        }}
                                        />
                                            
                                        
                                <div className="flex flex-row text-center justify-center md:justify-start  mt-4 text-gray-700">
                                    <div className="w-sm px-4  px-6 py-2 bg-primary-200 rounded-full flex flex-row items-center justify-center">
                                        <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path
                                                    d="M5.45887 2L1 6.01478L2.33826 7.50107L6.79713 3.48629L5.45887 2Z"
                                                    fill="currentColor"
                                                />
                                                <path d="M11 8H13V12H16V14H11V8Z" fill="currentColor" />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.5411 2L23 6.01478L21.6617 7.50107L17.2029 3.48629L18.5411 2Z"
                                                    fill="currentColor"
                                                />
                                                </svg>{moment(date).format("h:mm a")}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
  );
}
