import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const fulllist = FullList.instance;
  const templates = ListTemplate.instance;

  const intemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  intemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText.length) return;

    const itemId: number = fulllist.List.length
      ? parseInt(fulllist.List[fulllist.List.length - 1].id) + 1
      : 1;

      const newItem = new ListItem(itemId.toString(), newEntryText)

      fulllist.addItem(newItem)

      templates.render(fulllist)
  });

  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItems.addEventListener("click", (): void => {
    fulllist.clearList();
    templates.clear();
  });

  fulllist.load();
  templates.render(fulllist);
};
document.addEventListener("DOMContentLoaded", initApp);
