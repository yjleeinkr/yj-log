# Throttle & Debounce

자주 사용되는 이벤트나 함수들의 실행 빈도를 줄여서 성능을 향상시키기 위한 개념

짧은 시간 안에 연속적으로 발생하는 `scroll`, `resize`, `input` 등과 같은 이벤트에 할당된 핸들러는 과도하게 호출되기 때문에 성능에 문제를 일으킬 수 있다.

## Throttle 개념

연속적으로 높은 빈도로 발생하는 이벤트를 **~~일정 주기마다 처리~~**함으로써 이벤트를 제어하는 방식

![throttle](https://github.com/yjleeinkr/yj-log/assets/69417234/e7c95085-4df7-49ff-b596-0e4d58f51fdb)

- 이벤트 발생 주기를 제어하는 기술이므로 연속적인 이벤트 발생으로 인한 과부하를 줄이는데 사용하는게 좋다.
- ex) **scroll**, **resize** 등의 매우 연속적인 이벤트에서 주로 사용한다. (**무한 스크롤** 등)


## Throttle 구현 방법

```js
function throttle(cb, tick) {
  let isWaiting = false; // 클로저 개념을 사용하여 함수 내부 변수 선언

  return function () {
    if (isWaiting) return; // 대기 시간일 경우 리턴
    cb(); // 대기 시간이 아닐 경우 콜백함수 실행
    isWaiting = true; // 콜백함수 실행 후 true로 바꿔서 실행되지 않게함
    setTimeout(() => {
      isWaiting = false;
    }, tick); // 정해진 시간이 지나고 다시 isWaiting을 false로 바꿔 콜백함수 실행되게 함
  };
}
```

스크롤을 하면서 리스트를 업데이트한다고 가정하면,

1. 첫 스크롤때는 `isWaiting`이 `false`이므로 리스트를 가져오는 콜백함수가 바로 실행되고 다시 `isWaiting`을 `true`로 바꾼 뒤 `isWaiting`을 `false`로 만드는 타이머함수를 정의한다.
2. 그 뒤로 연속적으로 스크롤이벤트가 발생해도 `isWaiting`은 `true`이기 때문에 조기 리턴된다.
3. 그러다가 일정 주기 즉, `setTimeout`의 `tick`이 지나고 나면 다시 `isWaiting`이 `false`가 되면서 콜백함수가 실행된다.

---

## Debounce 개념

기계적인 접점을 가지는 스위치를 한 번만 눌렀다 떼는 경우에도 눌림 상태일 때의 지속 시간이나 외부 진동, 충격에 의해 짧은 순간에 스위치가 여러 번 on/off 되는 현상을 바운싱 현상이라고 한다.

이를 방지하기 위한 것이 **디바운스 기법**이다.

연속적으로 높은 빈도로 발생하는 이벤트들을 **~~그룹화~~**하여 해당 이벤트 그룹이 **~~일시정지~~** 되었다고 판단되는 시점이 지나면 **~~최초 || 최후의 이벤트에 대해서만~~** 처리하는 방식

![debounce](https://github.com/yjleeinkr/yj-log/assets/69417234/4d4ccb14-b691-4502-8d29-716eec8e3d06)

- 연속적으로 발생하는 이벤트 중에서 마지막 이벤트를 처리하는 기술이어서 이벤트 발생이 정지된 후에 일정 시간이 지나고나서 마지막 이벤트를 실행하도록 하므로, **사용자의 입력이 끝났을 때 api 요청을 보내는게 효율적인 경우** 사용하는게 좋다.
- ex) 검색창에 텍스트를 입력해서 검색 결과를 실시간으로 보여줘야하는 경우, 타이핑 도중에 매번 서버에 요청하는 건 비효율적이므로 타이핑을 멈추고 일정 시간이 지난 뒤에 검색 요청을 보낼 때 주로 사용한다.

## Debounce 구현 방법

```js
function debounce(cb, tick) {
  let timeout; // 클로저 개념을 사용하여 함수 내부에 timeout 변수를 선언

  return function (...args) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args); // tick만큼 시간 지나고 콜백함수 실행
    }, tick);
  };
}
```

밥 이라는 단어를 타이핑한다고 하면,

1. ‘ㅂ’ 을 쳤을 땐 `timeout`이 없기 때문에 `timeout`에 타이머함수가 할당되고 끝난다.
2. 그 뒤에 연속적으로 ‘ㅏ’를 치면 `timeout`에 할당된 타이머함수가 있기때문에 `clearTimeout`으로 타이머 함수를 종료시키고 다음 줄에 또 새로운 타이머함수를 할당해준다.
3. 그 뒤에 ‘ㅂ’을 치면 2번처럼 역시나 기존의 `timeout`에 할당된 타이머함수를 종료시키고, 새로운 타이머 함수를 `timeout`에 할당하고 `tick`만큼의 시간이 지나도 아무런 타이핑이 없다면 전달받은 콜백함수 `cb`를 실행시킨다.

###

여기서 더 디테일하게 나가보자면,,,

위에서 디바운싱은 이벤트를 그룹지었을 때 그 이벤트 그룹이 일시정지되었다고 판단되는 시점이 지나면 최초 또는 최후의 이벤트만 처리한다고했는데, **위의 방식은 최후 즉, 마지막 이벤트만 처리하는 방식**이다.

**~~최초의 이벤트만 처리하는 건 어떻게 할까?~~**

###

## Debounce - leading edge vs trailing edge

위에서 말한 디바운싱 기법에서 이벤트를 처리하는 시점을 일컬을 때 최초 이벤트 처리를 `leading edge`, 최후 이벤트 처리를 `trailing edge`라고 한다.

이 옵션을 위에서 구현한 debounce 함수에 적용해보면 아래와 같다.

- leading이 false일 경우: trailing edge로 마지막 이벤트가 실행되고 그 전의 이벤트는 무시한다.
- leading이 true일 경우: leading edge로 첫번째 이벤트가 실행되고 그 뒤의 이벤트는 무시한다.

```js
function debounce(cb, tick, leading = false) {
  let timeout;
  return function (...args) {
    let callFirst = leading && !timeout;
    const later = () => {
      timeout = null;
      if (!leading) cb(...args); // trailing edge일 경우만 실행
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, tick);
    if (callFirst) cb(...args);
  };
}
```

위의 코드를 좀 자세히 설정하자면 아래와 같다.

1. `leading`을 `true`로 설정한다면, `callFirst`가 `true`로 할당된다.
2. 그 후 어차피 `timeout`이 없으므로 `cleartTimeout()`은 종료시킬 타이머가 없다.
3. 그리고 `timeout`에 `setTimeout`을 할당하게 되고, `callFirst`가 `true`이므로 즉시 콜백함수가 실행된다.
4. 그 이후 `timeout`에 타이머 함수가 할당된 상태이기 때문에 `callFirst`는 `false`가 되고, 연속적인 이벤트가 발생되어도 `clearTimeout`으로 타이머함수를 종료시키고 또 다른 타이머함수를 `timeout`에 할당해준다.
5. 하지만 이후 입력을 멈추게 되고 `tick`시간만큼의 시간이 지나면, `later`라는 함수가 실행 되면서 `timeout`을 `null`로 다시 초기화하면서 `callFirst`가 다시 `true`가 되어 콜백함수가 다시 실행된다.

##

이렇게 throttle과 debounce 기법에 대해 알아보았다.

####

보통 `lodash`에서 제공해주는 함수를 많이들 쓰는 것 같고, "나는 굳이 라이브러리를 사용하고 싶지 않다!" 싶을 땐 위처럼 따로 `debounce`나 `throttle` 함수를 util 함수로 따로 구현해서 이벤트 핸들러의 콜백함수를 이 `debounce`나 `throttle`함수의 콜백함수로 넣어주면 어디서든 필요할 때 써먹을 수 있겠다.

```js
import { debounce, throttle } from './util.js';

const $input = document.querySelector('.text-input');
$input.addEventListener('input', debounce(handleTyping, 600));
// $input.addEventListener("input", handleTyping); // 디바운싱 하기 전

const $scrollBox = document.querySelector('.scroll-box');
$scrollBox.addEventListener('scroll', throttle(handleScroll, 2000));
// $scrollBox.addEventListener("scroll", handleScroll); // 스로틀링 하기 전
```

그리고 둘이 조금 헷갈릴 수 있겠지만, 반복해서 비교하자면 아래와 같다.

### `throttle`

이벤트 하나가 발생한 뒤에 특정 시간동안은 이벤트가 발생하지 않지만 그 시간이 지나면 다시 이벤트가 동작한다. (입력이 계속 되어도 ~~일정 시간이 지나면~~ 다시 이벤트가 동작한단 뜻!)

### `debounce`

입력이 계속될 동안은 이벤트가 발생하지 않지만 입력을 멈추고 특정 시간 후에 이벤트 하나가 동작한다. (~~입력을 멈추고 정해둔 시간이 지나면~~ 최초 || 최후의 이벤트가 동작한단 뜻!)

###

어쨌든 둘 다 사용자 경험을 향상시키고 성능을 최적화하는데 유용하게 사용할 수 있으므로 이벤트의 특성을 생각하여 적합한 기법을 쓰는게 중요해보인다!

