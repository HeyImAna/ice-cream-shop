import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={288}
    height={416}
    viewBox="0 0 288 416"
    backgroundColor="#ededed"
    foregroundColor="#f5f5f5"
  >
    <rect x="0" y="0" rx="15" ry="15" width="288" height="252" />
    <rect x="16" y="226" rx="0" ry="0" width="150" height="21" />
    <rect x="0" y="264" rx="15" ry="15" width="288" height="56" />
    <rect x="0" y="388" rx="15" ry="15" width="97" height="28" />
    <rect x="0" y="328" rx="15" ry="15" width="288" height="48" />
    <rect x="16" y="482" rx="0" ry="0" width="62" height="21" />
    <rect x="94" y="482" rx="0" ry="0" width="76" height="21" />
    <rect x="265" y="482" rx="0" ry="0" width="50" height="21" />
    <rect x="207" y="388" rx="15" ry="15" width="81" height="28" />
  </ContentLoader>
);

export default Skeleton;
