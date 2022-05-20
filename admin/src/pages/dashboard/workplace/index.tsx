import { useEffect } from 'react';
import { GlobalState } from '@/store';
import { useSelector } from 'react-redux';
function Workplace() {
  const state = useSelector((state: GlobalState) => state);
  useEffect(() => {
    console.log(12);
  }, []);

  return <div>1234</div>;
}

export default Workplace;
