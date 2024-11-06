import {
  createContext,
  ElementType,
  ReactNode,
  useContext,
  useState,
} from 'react';

const PortalContext = createContext('PortalContext');

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  // 存放所有 Portal 组件
  const [portals, setPortals] = useState<ElementType[]>([]);

  const addPortal = (portal: ElementType) => {
    setPortals([...portals, portal]);
  };

  const removePortal = (portal: ElementType) => {
    setPortals(portals.filter((p) => p !== portal));
  };

  return (
    <PortalContext.Provider value={{ addPortal, removePortal }}>
      {children}
      {/* 渲染所有 Portals 到顶层 */}
      {portals.map((PortalComponent, index) => (
        <PortalComponent key={index} />
      ))}
    </PortalContext.Provider>
  );
};

// 自定义 hook 来使用 Portal 上下文
export const usePortal = () => useContext(PortalContext);
