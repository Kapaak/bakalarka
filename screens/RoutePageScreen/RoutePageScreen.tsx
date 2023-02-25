import { Container, HorizontalStack, MaxWidth } from "@/ui";

export const EditableItem = () => {
  return <h1 contentEditable="true">-- Write your own name here</h1>;
};

export const RoutePageScreen = () => {
  return (
    <section className="relative z-negative bg-gradient-to-r from-main-yellow to-main-orange">
      <EditableItem />
      <MaxWidth>
        <Container fullHeight>
          <HorizontalStack className="relative h-full rounded-lg bg-transparent before:absolute before:z-negative before:h-full before:w-full before:rounded-lg before:bg-white before:opacity-50 before:content-['']">
            <div className="flex-1 p-12">
              <div
                contentEditable="true"
                onInput={(e) => console.log(e.currentTarget.textContent)}
              >
                <p>Název trasy</p>
                <p>Okolo potoka</p>
              </div>
              <EditableItem />
              <div>
                <p>Popis trasy</p>
                <p>Příjemné posezení, kolem rybníku. Dalo se zde i koupat.</p>
              </div>
              <div>
                <div>
                  <p>počet km</p>
                  <p>32</p>
                </div>
              </div>
            </div>
            <div className="flex-1 border border-red-500 p-4">
              <div className="h-full border border-red-500">mapa</div>
            </div>
          </HorizontalStack>
        </Container>
      </MaxWidth>
    </section>
  );
};
