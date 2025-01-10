import { useCartStore } from "../../store/cartStore"

export const BasketButton = () => {
  const items = useCartStore((state) => state.items)

  return (
    <div className="relative">
      <svg
        width="46"
        height="41"
        viewBox="0 0 46 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.5255 7.38001H24.4309C23.8251 7.38001 23.2441 7.59599 22.8157 7.98044C22.3873 8.36489 22.1467 8.88631 22.1467 9.43C22.1467 9.9737 22.3873 10.4951 22.8157 10.8796C23.2441 11.264 23.8251 11.48 24.4309 11.48H39.5255C39.7149 11.4785 39.9025 11.5146 40.0746 11.5856C40.2468 11.6566 40.3994 11.7608 40.5216 11.8908C40.6438 12.0207 40.7325 12.1733 40.7814 12.3376C40.8303 12.5019 40.8383 12.6738 40.8047 12.8412L37.3417 27.7406C37.29 28.0092 37.1342 28.2528 36.9018 28.4284C36.6694 28.6039 36.3754 28.7001 36.0716 28.7H21.2695C20.9657 28.7001 20.6717 28.6039 20.4393 28.4284C20.2069 28.2528 20.0511 28.0092 19.9994 27.7406L14.9466 1.64001C14.8448 1.17693 14.5667 0.760047 14.1599 0.46083C13.7532 0.161613 13.2431 -0.00130406 12.7171 7.86192e-06H2.28254C1.93447 0.000245256 1.59105 0.0718674 1.27853 0.209404C0.96601 0.346941 0.692643 0.546755 0.479311 0.793586C0.265979 1.04042 0.118323 1.32774 0.0476204 1.6336C-0.0230824 1.93947 -0.0149621 2.25579 0.0713611 2.55841C0.210204 3.01137 0.514338 3.40944 0.935098 3.68893C1.35586 3.96842 1.86892 4.11316 2.39219 4.10001H10.8532L15.5314 28.4376C15.7668 29.6528 16.4703 30.7553 17.519 31.5526C18.5677 32.3498 19.8951 32.7913 21.2695 32.8H36.0716C37.4523 32.799 38.7884 32.361 39.8446 31.5631C40.9009 30.7651 41.6097 29.6584 41.8463 28.4376L45.3093 13.53C45.4529 12.7745 45.411 12 45.1866 11.2606C44.9621 10.5212 44.5604 9.83463 44.0096 9.24896C43.4588 8.66329 42.7722 8.19261 41.9977 7.86979C41.2231 7.54698 40.3794 7.37983 39.5255 7.38001V7.38001Z"
          fill="#373567"
        />
        <path
          d="M33.2367 18.8599C33.8425 18.8599 34.4235 18.6439 34.8519 18.2595C35.2803 17.875 35.521 17.3536 35.521 16.8099C35.521 16.2662 35.2803 15.7448 34.8519 15.3603C34.4235 14.9759 33.8425 14.7599 33.2367 14.7599H25.927C25.3212 14.7599 24.7401 14.9759 24.3118 15.3603C23.8834 15.7448 23.6427 16.2662 23.6427 16.8099C23.6427 17.3536 23.8834 17.875 24.3118 18.2595C24.7401 18.6439 25.3212 18.8599 25.927 18.8599H33.2367Z"
          fill="#373567"
        />
        <path
          d="M22.2723 41.0001C24.0385 41.0001 25.4703 39.7152 25.4703 38.1301C25.4703 36.5451 24.0385 35.2601 22.2723 35.2601C20.5061 35.2601 19.0743 36.5451 19.0743 38.1301C19.0743 39.7152 20.5061 41.0001 22.2723 41.0001Z"
          fill="#373567"
        />
        <path
          d="M35.0643 41.0001C36.8305 41.0001 38.2623 39.7152 38.2623 38.1301C38.2623 36.5451 36.8305 35.2601 35.0643 35.2601C33.2981 35.2601 31.8663 36.5451 31.8663 38.1301C31.8663 39.7152 33.2981 41.0001 35.0643 41.0001Z"
          fill="#373567"
        />
      </svg>

      <div className="w-5 h-5 absolute bg-text rounded-full text-primary text-center -right-2 -top-2 text-sm">
        {items.length}
      </div>
    </div>
  )
}
