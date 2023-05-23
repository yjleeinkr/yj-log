import Profile from '@/components/Profile';
export default function AboutPage() {
  return (
    <div className="pb-3 box-border">
      <Profile />
      <main className="bg-lightgrey p-5 text-center max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto">
        <section className="p-5">
          <h2 className="font-semibold">Who am I?</h2>
          <p className="text-sm">보기 좋은게 쓰기도 좋다고 생각합니다.</p>
          <p className="text-sm">깔끔하고 편한 서비스를 만드는 프론트엔드 개발자</p>
        </section>
        <section className="p-5">
          <h2 className="font-semibold">Career</h2>
          <p className="text-sm">Ozlabs 글로벌 카지노 게임 플랫폼 (2022.11 - Now)</p>
        </section>
        <section className="p-5">
          <h2 className="font-semibold">Skills</h2>
          <p className="text-sm">React, Next, Vue</p>
          <p className="text-sm">Node.js</p>
          <p className="text-sm">Javascript, Typescript</p>
        </section>
      </main>
    </div>
  );
}
