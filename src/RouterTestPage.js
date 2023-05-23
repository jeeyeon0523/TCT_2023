import { useSearchParams } from 'react-router-dom';

function RouterTestPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const data = searchParams.get('data');

    return (<>
        <div>Router worked!</div>
        <div>{data ? data : ''}</div>
    </>)

}
export default RouterTestPage