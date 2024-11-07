import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...")
  let result = [];
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId:categoryId},
    )

    if(!response?.data?.success){
       throw new Error("Could not fatch Category page data")
    }
    
    result = response?.data;
  } catch (error) {
    console.log("Catalog page data API error",error);
    toast.error(error?.message);
  }
  toast.dismiss(toastId);
  return result;
}