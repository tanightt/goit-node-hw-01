const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const all = await contacts.listContacts();
      console.log(all);
      break;
    case "get":
      const one = await contacts.getContactById(id);
      console.log(one);
      break;
    case "add":
      const add = await contacts.addContact(name, email, phone);
      console.log(add);
      break;
    case "remove":
      const delate = await contacts.removeContact(id);
      console.log(delate);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
