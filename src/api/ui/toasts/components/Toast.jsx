import webpackModules from "webpackModules";
const Header = webpackModules.findByDisplayNameAll("Header")[1];
const Text = webpackModules.findByDisplayName("Text");

export default (props) => {
  return (
    <div onClick={props.onClick} className={"HydroCord-toast" + (props.className ? ` ${props.className}` : "")}>
      {props.title ? <Header className="HydroCord-toast-title">{props.title}</Header> : null}
      {props.content ? (
        <div className="HydroCord-toast-content">
          <Text size={Text.Sizes.SIZE_16}>{props.content}</Text>
        </div>
      ) : null}
    </div>
  );
};
