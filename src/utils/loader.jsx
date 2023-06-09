import {RotateLoader} from 'react-spinners';

export default function Loader() {
  return (
    <div className='w-full h-[200px] flex justify-center items-center col-span-3 self-center place-self-center'>
      <RotateLoader loading={true} color='tomato' size={10}/>
    </div>
  )
}
