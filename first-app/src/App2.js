// 5-2
import styled, { keyframes } from 'styled-components';
import React, { useState } from 'react';
import {
  BrowserRouter,
  useParams,
  Route,
  Routes,
  Link,
} from 'react-router-dom';

const Post = ({ list }) => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <h1>Post Component</h1>
      id: {params.id}
      <h3>글내용: {list[params.id]}</h3>
      <br />
      <Link to="/hello">return to 글쓰기 화면</Link>
    </>
  );
};

const boxAnimation = (color) => keyframes`
  0% {
    background-color: black;
  }
  50% {
    background-color: ${color};
  }
  100% {
    background-color: red;
  }
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
  animation-name: ${(props) => boxAnimation(props.color)};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const HelloTitle = styled.div`
  color: ${({ color: { me } }) => me};
`;

const Hello = ({ list, setList }) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    setList(list.concat([value]));
    setValue('');
  };
  console.log({ list });
  return (
    <>
      <Box color={value} />
      <h1>this is Hello Component</h1>
      <HelloTitle color={{ me: 'green' }}>글쓰기 화면</HelloTitle>
      <br />
      <input value={value} type="text" onChange={handleChange} />
      <button onClick={handleClick}>등록</button>
      <br />
      <p>----글 리스트----</p>
      {list.map((item, i) => (
        <Link key={i} to={`/post/${i}`}>
          <div>{item}</div>
        </Link>
      ))}
      <p>-------------------</p>
      <div>
        <Link to="/">return to form</Link>
      </div>
    </>
  );
};

const App = () => {
  const [list, setList] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        {/* swtich(주소창 내용물) */}
        {/* case: 주소창이 "/" 면 <Form /> 렌더; break; */}
        <Route path="/" element={<Form />} />
        {/* case: 주소창이 "/hello/아무문자열" 이면 <Hello /> 렌더; break; */}
        <Route
          path="/hello"
          element={<Hello list={list} setList={setList} />}
        />
        <Route path="/post/:id" element={<Post list={list} />} />
      </Routes>
    </BrowserRouter>
  );
};

const fields = [
  {
    key: 'id',
    label: 'id',
    placeholder: '6글자 이상 20글자 이하',
    initialValue: '',
    checkValid: (v) => v.length >= 6 && v.length <= 20,
  },
  {
    key: 'pw',
    label: 'password',
    placeholder: '12글자 이상 20글자 이하',
    initialValue: '',
    checkValid: (v) => v.length >= 12 && v.length <= 20,
  },
  // {
  //   key: 'name',
  //   label: '이름',
  //   initialValue: '',
  //   placeholder: '아무이름',
  //   checkValid: (v) => v.length >= 1 && v.length <= 5,
  // },
];

const Form = () => {
  const [values, setValues] = React.useState(
    fields.reduce(
      (acc, { key, initialValue }) => ({ ...acc, [key]: initialValue }),
      {}
    )
  );
  const refs = React.useRef(Array.from(Array(fields.length, () => null)));
  const valids = fields.map(({ key, checkValid }) => checkValid(values[key]));
  const isButtonDisabled = !Object.values(values).some((value) => value.length);

  const handleClick = (e) => {
    e.preventDefault();
    // 클릭하면 이동하는 기능 막기

    const isAllValid = valids.every((isValid, i) => {
      const { key, initialValue, label } = fields[i];
      if (!isValid) {
        setValues((prev) => ({
          ...prev,
          [key]: initialValue,
        }));
        refs.current[i].focus();
        alert(`유효하지 않은 ${label}입니다`);
      }
      return isValid;
    });

    if (!isAllValid) {
      return;
    }
    alert('회원가입 성공!');
  };

  const handleChangeValue = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isAllValid = valids.every((a) => a);
  // 각각의 valid 유효성을 검사하는 변수

  return (
    <div>
      {fields.map(({ key, label, placeholder }, i) => (
        <div key={key}>
          <input
            type="text"
            ref={(ref) => (refs.current[i] = ref)}
            name={key}
            value={values[key]}
            placeholder={placeholder}
            onChange={handleChangeValue}
          />
          {!valids[i] && `유효하지 않은 ${label}입니다`}
        </div>
      ))}

      <Link to={`/hello`}>
        <button
          type="button"
          onClick={isAllValid ? undefined : handleClick}
          disabled={isButtonDisabled}
        >
          회원가입
        </button>
      </Link>
      {/* 조건부 렌더링이 아닌, 페이지 이동을 하는 기본 동작을 막는 방법 */}

      {isAllValid ? (
        <Link to={`/hello/${values.id}`}>
          <button type="button">(유효한버튼) 회원가입</button>
        </Link>
      ) : (
        <button type="button" onClick={handleClick} disabled={isButtonDisabled}>
          (유효하지 않은 버튼) 회원가입
        </button>
      )}

      {/* 조건부 렌더링으로 유효할 때만 Link로 다른 페이지 이동이 가능하게 만드는 방법 */}
    </div>
  );
};
export default App;
