/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package microid;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.StringTokenizer;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


/**
 *
 * @author jslee
 */
public class MarkerClassification {

    static Hashtable<String,Integer> fre_ht = new Hashtable<String,Integer>();

    static Hashtable<String,Integer> marker = new Hashtable<String,Integer>();

    static String names = new String();



    public static void main(String[] args) throws FileNotFoundException, IOException {


        // TODO code application logic here

        int binsize = 60;
        int overlap = 1;

        int marker_cut = 0;
        String prefix = "../../ext/set3";

        File f2 = new File(prefix + "/test_file/");

        for(String fileList2:f2.list()){
            //System.out.println("## sample - "+ fileList2 );
            System.out.println("{\n'sample':" + fileList2 + ",");
            System.out.println("}");
            BufferedReader reader3 = new BufferedReader(new FileReader(prefix + "/marker_metadata/list.txt"));
            BufferedReader reader5 = new BufferedReader(new FileReader(prefix + "/marker_metadata/marker_cut.txt"));

            String text3 = new String();
            String text5 = new String();

            while ((text3 = reader3.readLine()) != null) {
                text5 = reader5.readLine();
                marker_cut = Integer.parseInt(text5);
                //System.out.println(text3);






                BufferedReader reader2 = new BufferedReader(new FileReader(prefix + "/marker_data/"+text3+".txt"));
                String text2 = new String();



                while ((text2 = reader2.readLine()) != null) {

                    marker.put(text2, 1);

                }


                String type = new String();


                //System.out.println("###################################"+ text3 +"###########################################");
                int count = 0;

                type=fileList2.substring(fileList2.indexOf(".")+1,fileList2.indexOf(".")+4);
                //System.out.println(type);

                count = analyzeBin(type,fileList2,binsize, overlap);

                //code for reducing recall, but increasing precision
                if(marker_cut != marker.size()){
                    marker_cut += 1;
                }

                if(count >= marker_cut){
                    System.out.println("\t$$$$ " + text3 + " is detected.");
                }else{
                    //System.out.println( fileList2 + " is unidentified");
                }



                marker.clear();


            }
        }


    }

    private static int analyzeBin(String type,String file,int binsize, int overlap) {
        int count = 0;

        try {


            String text = new String();
            String mz = new String();

            int m_z = 0;

            String intensity = new String();
            double inten = 0;

            double inten_max = 0;

            String prefix = "../../ext/set3";





            if(type.matches("xml")){

                File fXmlFile = new File(prefix + "/test_file/"+file);
                DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                Document doc = dBuilder.parse(fXmlFile);
                doc.getDocumentElement().normalize();


                //System.out.println("==========================================================");
                //System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
                //System.out.println("date:" + doc.getDocumentElement().getAttribute("DateTime"));
                NodeList nList = doc.getElementsByTagName("PeakInfo");
                //System.out.println("-----------------------");

                for (int temp = 0; temp < nList.getLength(); temp++) {

                   Node nNode = nList.item(temp);
                   if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                        Element eElement = (Element) nNode;


                        //System.out.println(eElement.getAttribute("mz")+"\t"+eElement.getAttribute("Rel_Intensity")+"\t"+eElement.getAttribute("Intensity"));
                        //System.out.println(eElement.getAttribute("mz")+"\t"+eElement.getAttribute("Rel_Intensity"));

                        mz = eElement.getAttribute("mz");
                        m_z = (int)Double.parseDouble(mz)/binsize;

                        intensity = eElement.getAttribute("Rel_Intensity");
                        inten = Double.parseDouble(intensity);
                        //System.out.println(inten);

                        if(inten_max < inten){
                            inten_max = inten;
                        }

                        double check3 = 0;

                        int standard = 0;


                        standard = m_z*binsize;

                        int median = 0;

                        median = binsize/2;

                        int result = 0;

                        if(overlap == 1){

                            check3 = Double.parseDouble(mz) - standard;

                            if(check3 >= median){
                                result = standard+median;
                                mz = String.valueOf(result);
                                fre_ht.put(mz,1);
                            }else{
                                result = standard-median;
                                mz = String.valueOf(result);
                                fre_ht.put(mz,1);
                            }
                        }

                        result = standard;
                        mz = String.valueOf(result);

                        fre_ht.put(mz,1);
                   }
                }
            }else if(type.matches("txt") || type.matches("csv")){
                BufferedReader reader = new BufferedReader(new FileReader(prefix + "/test_file/"+ file));

                reader.readLine();
                names = file;
                while ((text = reader.readLine()) != null) {
                    //System.out.println(text);
                    StringTokenizer tokenizer = new StringTokenizer(text, ",");
                    mz = tokenizer.nextToken();
                    m_z = (int)Double.parseDouble(mz)/binsize;

                    intensity = tokenizer.nextToken();
                    inten = Double.parseDouble(intensity);

                    if(inten_max < inten){
                        inten_max = inten;
                    }


                    double check3 = 0;
                    int standard = 0;

                    standard = m_z*binsize;

                    int median = 0;

                    median = binsize/2;

                    int result = 0;

                    if(overlap == 1){

                        check3 = Double.parseDouble(mz) - standard;

                        if(check3 >= median){
                            result = standard+median;
                            mz = String.valueOf(result);
                            fre_ht.put(mz,1);
                        }else{
                            result = standard-median;
                            mz = String.valueOf(result);
                            fre_ht.put(mz,1);
                        }
                    }


                    //intensity = tokenizer.nextToken();

                    result = standard;
                    mz = String.valueOf(result);

                    fre_ht.put(mz,1);

                }
            }


            Enumeration en = fre_ht.keys();

            while(en.hasMoreElements()){

              String key = en.nextElement().toString();

              if(marker.get(key)!= null){
                  count++;
              }



            }

            fre_ht.clear();

            return count;

            //System.out.println(count);




             } catch (Exception e) {
                e.printStackTrace();
                System.out.println(names);
            }

        return count;

    }



}
