import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
export default function Filters() {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        MenuItem
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Country" type="checkbox">
          <MenuItemOption value="email">Email</MenuItemOption>
          <MenuItemOption value="phone">Phone</MenuItemOption>
          <MenuItemOption value="country">Country</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
