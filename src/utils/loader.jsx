import {RotateLoader} from 'react-spinners';

export default function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <RotateLoader loading={true} color='lightblue' size={100}/>
    </div>
  )
}
