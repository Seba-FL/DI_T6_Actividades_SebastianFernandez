package lanzaayuda;

import java.awt.event.KeyEvent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import java.io.File;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.KeyStroke;

import java.net.URL; 
import javax.help.*;


/**
 *
 * @author Sebastian Fernandez
 */
public class LanzaAyuda 
{
    private static JFrame frame;
    private static JPanel panel;
    private static JMenuBar menuBar;
    private static JMenu menu;
    private static JMenuItem menuItem;
    
    public static void main(String[] args) 
    {                                  
        // Creamos una ventana
        frame = new JFrame("Lanza Ayuda");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        // Creamos el panel
        panel = new JPanel();
        panel.setSize(300, 400);
        
        // Creamos el MenuBar
        menuBar = new JMenuBar();

        // Creamos el primer menú
        menu = new JMenu("Ayuda");        
        
        // Creamos el primer menuItem
        menuItem = new JMenuItem("Contenido de Ayuda");
        HelpSet hs = obtenFicAyuda(); 
        HelpBroker hb = hs.createHelpBroker();
        
        hb.enableHelpOnButton(menuItem, "ayuda", hs);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_F1, 0));
        hb.enableHelpKey(menuItem, "ayuda", hs);
        
        menu.add(menuItem);
        menuItem = new JMenuItem("About");   
                
        menu.add(menuItem);
        menuBar.add(menu);
                
        frame.setJMenuBar(menuBar);
        frame.setVisible(true);
        frame.setSize(300, 300);   
        
    }
    
            
    public static HelpSet obtenFicAyuda()
    { 
        try 
        { 
            File file = new File(LanzaAyuda.class.getResource("help/helpset.hs").getFile());
            
            URL url = file.toURI().toURL();
            HelpSet hs = new HelpSet(null,url);
            
            return hs;
        }
       catch (Exception ex) 
        { 
        JOptionPane.showMessageDialog(null,"Fichero HelpSet no encontrado"); 
        return null; 
        } 
    }
    
}
