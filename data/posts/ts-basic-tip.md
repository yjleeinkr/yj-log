# Typescript

신입 교육 기간이 끝나고 이제 실무에 들어가게 되었는데 아쉽게도 자바스크립트로 된 조금 오래된 코드였다! 사실 처음 타입스크립트를 접했을 땐 좋은 거 같으면서도 조금은 귀찮게 느껴졌다. 근데 한번 프로젝트를 타입스크립트로 하고 나니 코드가 많아질수록 빛을 발하는 자동 완성과 컴파일 에러 발견에 대한 장점을 느낄 수 있었고 그 때부터 자바스크립트가 오히려 불편한 느낌이었다.  
그래서 타입스크립트에 무뎌지기 전에 타입스크립트로 리팩토링할 순간을 대비하며 기본적인 내용 중 조금 포인트 될만한 것들만 추려서 정리해본다.

## Tuple은 언제 쓰는 게 좋을까?

`Tuple`은 조금의 단점이 있다. 배열은 인덱스로 값을 가져오기 때문에 해당 데이터가 뭘 가리키는지 쉽게 알 수 없어서 가독성이 떨어진다.

```ts
let person: [string, number];
person = ['yj', 230];
console.log(person[0], person[1]); // 가독성이 떨어진다.
const [name, footSize] = person; // ⭐️ 다만, 배열 디스트럭쳐링을 사용하면 가독성이 올라간다.
```

위와 같은 가독성 문제로, 웬만하면 `Tuple` 대신 `interface`, `type alias`, `class` 로 대체해서 쓰는 게 좋다고 하는데...

### **그렇다면 언제 `Tuple`을 쓰는게 맞는 걸까?**

React에서 빠질 수 없는 `useState()` 훅이 `tuple`의 좋은 예시라고 볼 수 있다.  
상태와 상태를 바꾸는 set함수를 같이 묶을 때 `tuple`이 사용되었다.

```js
const [count, setCount] = useState(0);
```

💡 실제로 React 라이브러리를 까보면 아래처럼 리턴값을 튜플 형태로 정해둔 걸 확인할 수 있다.
![image](https://github.com/yjleeinkr/yj-log/assets/69417234/2f03cb78-e549-4994-8d67-bb6d67a57bd2)

> 뭔가를 동적으로 리턴하는데 `interface`로 묶기 애매하거나 `useState`처럼 관련 있는 다른 타입의 데이터를 묶어서 **~~사용하는 사람이 변수 이름을 직접 정의해서 쓸 경우엔~~** `Tuple`이 유용할 수 있다. (느낌 상 2개 정도의 데이터만 묶는게 적당할 것 같다.)

##

## Optional parameter (?) 와 Union (|)

함수를 만들다보면 특정 인자는 케이스에 따라 불필요해서 함수 호출 시에 넣지 않는 경우가 있다.
이 때 매개변수의 타입이 `undefined`일 수 있기에 `Union(|)`을 쓰거나 `Optional(?)`로 표기한다. 하지만 둘은 차이가 있다!

### 1. Optional parameter 방식

인자를 전달하지 않을 경우 자동적으로 `undefined`가 되며 에러가 나지 않는다.

```ts
function printCat(name: string, weight?: number) {
  console.log(name);
  console.log(weight);
}
printCat('hoochu', 6);
printCat('racle');
// 두번째 인자 weight를 안 넣어줘도 에러 없이 racle 및 undefined 출력
```

### 2. Union 방식

생략 불가능하다. 무조건 정의된 타입들 중 하나를 넣어줘야 한다.

```ts
function printCat(name: string, weight: number | undefined) {
  console.log(name);
  console.log(weight);
}
printCat('hoochu', 6);
printCat('racle'); // 두번째 인자 weight를 안 넣어줘면 에러 발생
printCat('racle', undefined); // 이렇게 무조건 인자를 넣어줘야 한다.
```

기본적이지만 다시 상기해보자면, 매개변수 값이 안 들어오는 경우를 대비해 특정 값으로 통일시켜주고 싶다면, `Default Parameter (=)`를 활용하자!

```ts
function printCat(name: string, weight: number = 0) {
  console.log(name);
  console.log(weight);
}
printCat('racle'); // 두번째 인자 weight를 안 넣어주면 자동으로 0 출력
```

## Union 어떻게 써야 잘 쓰는 걸까?

`Union`은 가능성 있는 값들의 집합이라고 볼 수 있다.  
이 때, `Union` 값들이 객체로 이뤄져있다면 **~~각 값들마다 공통적인 속성을 넣어주는 게 좋다.~~**

이게 무슨 말인지 아래 예시를 통해 정리해본다.

아래 `printLoginState` 함수를 보면 로그인 상태에 따라 응답 내용이나 에러 메시지를 출력하는 역할을 한다. 이 때 타입스크립트는 state 둘 중 어떤 게 올지 전혀 모르기 때문에 함수 내부에서 자동 완성 기능을 활용할 수 없을 뿐더러 타입이 정확하지 않아 각 자료형에 따른 메소드나 속성을 사용할 수 없다 ☹️

```ts
type SuccessState = {
  response: {
    body: string;
  };
};

type FailState = {
  reason: string;
};

type LoginState = SuccessState | FailState;

function login(): LoginState {
  return {
    response: {
      body: 'logged in!',
    },
  };
}

// 로그인 상태에 따라 응답 내용이나 에러 메시지를 출력하는 함수
function printLoginState(state: LoginState): void {
  if ('response' in state) {
    // state 객체 안에 response라는 속성이 있으면 SuccessState
    console.log(`success! ${state.response.body}`);
  } else {
    console.log(state.reason);
  }
}
```

그래서 위와 같이 객체 내에 특정 속성이 있는지 확인하는 조건문을 걸어주곤한다.
하지만, 이렇게 하는 것보다 아래와 같이 서로를 식별할 수 있는 공통 속성을 가진 `union`을 만드는게 중요하다.  
이렇게 하면 공통 속성(`result`)을 기준으로 조건문을 만들어 자동 완성도 사용할 수 있고 타입 안정성도 보장 받을 수 있다.

```ts
type SuccessState = {
    result: 'success', // ✨ 공통 속성
    response: {
        body: string
    }

type FailState = {
    result: 'fail', // ✨ 공통 속성
    reason: string
}

type LoginState = SuccessState | FailState
function login() : LoginState {
    return {
        result: 'success',
        response: {
            body: 'logged in!'
        }
    }

// ✨ 공통 속성으로 구분하기
function printLoginState(state: LoginState) {
    if (state.result === 'success') {
        console.log(`success! ${state.response.body}`);
    } else {
        console.log(state.reason)
    }
}
```

## Interface 계약서와 같다!

인터페이스는 객체의 스펙을 미리 정의해둔 약속, 규칙, 규격을 의미한다. 계약서로 생각하면 쉽다.

함수인자의 타입을 인터페이스로 정의했을 경우, 인터페이스의 속성 개수와 실제 인자에 넣는 객체의 속성 개수를 일치시키지 않아도 되며 인터페이스에 선언된 속성 순서를 지키지 않아도 괜찮다.

👉 즉, **~~타입스크립트는 인터페이스가 요구하는 프로퍼티가 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만 확인한다.~~**

```ts
interface ICat {
  name: string;
  age: number;
}
function logCatAge(obj: ICat) {
  console.log(obj.age);
}
let cat1 = { name: '후추', age: 2, weight: 5 };
logCatAge(cat1);
// 📌 interface에 지정해둔 것과 달리 매개변수에 weight가 추가되어도 에러가 나지 않는다.
```

#### ❓이해가 안 됐던 부분

```ts
interface ICat {
  name: string;
  age: number;
}
// 리턴값을 ICat으로 지정
function getCatDetails(): ICat {
  // ...
  return { name: '후추', age: 2, weight: 5 };
  // 해당 값은 ICat 인터페이스에 맞지 않다. 라는 에러가 뜸!
}
```

함수의 매개변수에 대한 타입을 인터페이스로 지정한 경우엔 매개 변수의 속성 개수가 더 많아져도 상관없는데,
왜 함수의 리턴값에 대한 타입을 인터페이스로 지정한 경우엔 리턴값의 속성 개수가 더 많아지면 에러가 나는지 이상했다.. 이유는 아래와 같다.

👉 자바스크립트엔 `Rest parameters` 즉, 인자 개수가 정해져 있지 않은 가변 인자 함수라는 개념이 있기 때문에 매개변수를 동적으로 받는다. 타입스크립트는 자바스크립트의 확장언어로 설계된거고 자바스크립트의 문법과 동적인 특성을 그대로 가져가면서 정적 타입 검사와 타입 안정성을 제공하기 때문에 **~~인터페이스로 이 가변인자에 대한 개념을 무시해버리면 자바스크립트와의 호환성을 막아버리는 것이기 때문에~~** 매개변수의 타입에 인터페이스를 지정하면 strict하게 먹히지 않는다.

### 인터페이스와 추상화

클래스에 인터페이스를 정해서 특정 조건, 규격을 구현하도록 할 수 있다.
`implements` 라는 키워드를 사용한다.

인터페이스를 통해 객체 지향 프로그래밍에서의 `추상화`가 가능하다!
부모 클래스 상속뿐만 아니라 인터페이스를 통해서도 각 클래스가 **~~공통적으로 가지고 있는 구현 사항이나 로직을 통일시키면서 불필요한 세부적인 것들은 제외~~**해서 공통적이고, 유연성있는, 재사용가능한 클래스를 만들 수 있다!

```ts
interface CraftBeer {
  beerName: string;
  nameBeer(beer: string): void;
}

// myBeer라는 클래스가 CraftBeer라는 인터페이스를 따라가라
class myBeer implements CraftBeer {
  beerName: string = 'Baby Guiness';
  nameBeer(b: string) {
    this.beerName = b;
  }
  constructor() {}
}
```

### 인터페이스 확장

`class`처럼 인터페이스 간 확장도 가능하다.
`extends` 라는 키워드를 사용한다.

```ts
interface Person {
  name: string;
}

interface Developer extends Person {
  skill: string[];
}

let fe = {} as Developer;
fe.name = 'yj';
fe.skill = ['javascript', 'typescript'];
```

## Enum 어떻게 쓸까?

특정 값들의 집합을 의미하는 자료형  
수박 자두 복숭아 와 같이 한 그룹안에 묶일 수 있는 자료형

### 숫자형 Enum

숫자형 이넘 선언 시 초기 값을 주면 초기 값부터 차례로 1씩 증가시켜 할당된다.

```ts
enum Direction {
  Up = 2,
  Down,
  Left,
  Right,
}
// Up 2 / Down 3 / Left 4 / Right 5
```

지정하지 않으면 0부터 차례씩 1 증가된다.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
// 각 0, 1, 2, 3 씩 할당됨
```

### 문자형 Enum

숫자형 이넘과 달리 자동 넘버링이 없어서 일일이 값을 할당해줘야하지만, 숫자가 아닌 문자로 값이 나타나므로 읽기 편하다.

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

보통은 `enum` 대신 `union`을 더 많이 쓴다고 한다.
이유는 아래와 같다.

1. enum에 해당하는 값과 같더라도 직접 할당할 수 없다. Union보다 불편하다!

```ts
// Enum 썼을 시
enum Fruits {
  AP = 'apple',
  OG = 'orange',
  CH = 'cherry',
}

function printFruit(fruit: Fruits) {
  console.log(fruit);
}

printFruit('apple'); // 💩 값이 같더라도 직접 넣어주면 에러 발생
printFruit(Fruits.AP); // 이렇게 해야 에러 사라짐

// Union 썼을 시
type TFruits = 'apple' | 'orange' | 'cherry';

function printTFruit(fruit: TFruits) {
  console.log(fruit);
}

printTFruit('apple'); // ✨ 자동완성으로 TFruits 옵션들이 떠서 더 편리하다.
```

2. `enum`은 확장(`extends`)이 불가능하기 때문에 확장을 하려면 `Union`을 어차피 써야한다!

3. `enum`은 컴파일 시 자바스크립트의 객체로 컴파일되므로 전체적인 코드 사이즈에 영향을 준다.

👉 하지만 아래와 같은 경우엔 `enum`을 유용하게 쓸 수 있다고 한다.

에러 메시지와 같이 길고 복잡한 string을 다룰 경우 Union대신 enum으로 그룹핑하여 사용할 땐 키값으로 대체하면 깔끔하게 코드를 짤 수 있다.

```ts
// 이렇게 길고 복잡한 union 대신
type TErrors = 'error msg simple version' | 'error msg long version' | 'error msg detailed version';

// ✨ enum을 객체처럼 써도 괜찮을 듯 싶다.
enum Errors {
  Short = 'error msg simple version',
  Long = 'error msg long version',
  Detail = 'error msg detailed version',
}
```
